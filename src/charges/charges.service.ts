import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Charge } from './charge.entity';
import { UpdateChargeStatusDto } from './dto/update-charge-status.dto';

@Injectable()
export class ChargesService {
  [x: string]: any;
  constructor(
    @InjectRepository(Charge)
    private readonly repo: Repository<Charge>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['unit', 'settlement'],
    });
  }

  findByUnit(unitId: number) {
    return this.repo.find({
      where: { unit: { id: unitId } },
      relations: ['settlement'],
    });
  }

  async updateStatus(id: number, dto: UpdateChargeStatusDto) {
    const charge = await this.repo.findOneBy({ id });
    if (!charge) throw new NotFoundException('Charge not found');

    charge.status = dto.status;
    charge.paidAt = new Date(dto.paidAt);

    return this.repo.save(charge);
  }
}
