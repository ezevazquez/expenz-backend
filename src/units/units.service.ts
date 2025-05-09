import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './unit.entity';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Building } from '../buildings/building.entity';

@Injectable()
export class UnitsService {
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
    return this.unitRepo.save(unit);
  }

  findAll() {
    return this.unitRepo.find({ relations: ['building'] });
  }
}
