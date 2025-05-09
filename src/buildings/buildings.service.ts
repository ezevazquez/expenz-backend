import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly repo: Repository<Building>,
  ) {}

  create(data: CreateBuildingDto) {
    const building = this.repo.create(data);
    return this.repo.save(building);
  }

  findAll() {
    return this.repo.find({ relations: ['units'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['units'] });
  }
}
