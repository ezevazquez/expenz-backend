/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Building } from '../buildings/building.entity';

@Injectable()
export class UnitsService {
  [x: string]: any;
  userRepo: any;
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,
  ) {}

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
}
