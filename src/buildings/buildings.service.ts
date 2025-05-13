import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly repo: Repository<Building>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateBuildingDto) {
    const { adminId, ...rest } = data;

    const admin = await this.userRepo.findOne({
      where: { id: adminId, role: 'admin' },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with id ${adminId} not found`);
    }

    const building = this.repo.create({
      ...rest,
      admin,
    });

    return this.repo.save(building);
  }

  findAll() {
    return this.repo.find({ relations: ['units'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['units'] });
  }
}
