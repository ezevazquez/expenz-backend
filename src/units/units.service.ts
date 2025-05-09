/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Building } from '../buildings/building.entity';
import { User } from '../users/user.entity';
import * as XLSX from 'xlsx';
import * as bcrypt from 'bcrypt';

type ExcelRow = {
  number: string;
  squareMeters: number;
  ownerEmail: string;
  tenantEmail?: string;
};

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.unitRepo.find({
      relations: ['building', 'owner', 'tenant'],
    });
  }

  async create(dto: CreateUnitDto) {
    const building = await this.buildingRepo.findOneBy({ id: dto.buildingId });
    if (!building) throw new NotFoundException('Building not found');

    const unit = this.unitRepo.create({
      number: dto.number,
      squareMeters: dto.squareMeters,
      building,
    });

    if (dto.ownerId) {
      const owner = await this.userRepo.findOneBy({ id: dto.ownerId });
      if (!owner) throw new NotFoundException('Owner not found');
      unit.owner = owner;
    }

    if (dto.tenantId) {
      const tenant = await this.userRepo.findOneBy({ id: dto.tenantId });
      if (!tenant) throw new NotFoundException('Tenant not found');
      unit.tenant = tenant;
    }

    return this.unitRepo.save(unit);
  }

  async importFromExcel(buffer: Buffer, buildingId: number) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

    const building = await this.buildingRepo.findOneBy({ id: buildingId });
    if (!building) throw new NotFoundException('Building not found');

    const results: { number: string; status: string }[] = [];

    for (const row of rows) {
      const number = row.number?.toString().trim();
      const squareMeters = parseFloat(row.squareMeters as any);
      const ownerEmail = row.ownerEmail?.toString().trim();
      const tenantEmail = row.tenantEmail?.toString().trim();

      if (!number || !squareMeters || !ownerEmail) {
        results.push({
          number: number || 'N/A',
          status: '❌ Datos incompletos',
        });
        continue;
      }

      let owner: User | null = await this.userRepo.findOneBy({
        email: ownerEmail,
      });
      if (!owner) {
        owner = this.userRepo.create({
          email: ownerEmail,
          password: await bcrypt.hash('default123', 10),
          name: 'Propietario',
          role: 'user',
        });
        await this.userRepo.save(owner);
      }

      let tenant: User | null = null;
      if (tenantEmail) {
        tenant = await this.userRepo.findOneBy({ email: tenantEmail });
        if (!tenant) {
          tenant = this.userRepo.create({
            email: tenantEmail,
            password: await bcrypt.hash('default123', 10),
            name: 'Inquilino',
            role: 'user',
          });
          await this.userRepo.save(tenant);
        }
      }

      const unit = this.unitRepo.create({
        number,
        squareMeters,
        building,
        owner: owner || undefined,
        tenant: tenant || undefined,
      });

      await this.unitRepo.save(unit);
      results.push({
        number,
        status: '✅ Importado',
      });
    }

    return {
      message: 'Importación completa',
      unidades: results,
    };
  }
}
