import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Settlement } from './settlement.entity';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { Building } from '../buildings/building.entity';
import { Expense } from '../expenses/expense.entity';
import { Unit } from '../units/unit.entity';
import { Charge } from '../charges/charge.entity';

@Injectable()
export class SettlementsService {
  constructor(
    @InjectRepository(Settlement)
    private readonly settlementRepo: Repository<Settlement>,
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
    @InjectRepository(Unit)
    private readonly unitRepo: Repository<Unit>,
    @InjectRepository(Charge)
    private readonly chargeRepo: Repository<Charge>,
  ) {}

  async create(dto: CreateSettlementDto) {
    const { period, buildingId } = dto;

    const building = await this.buildingRepo.findOneBy({ id: buildingId });
    if (!building) throw new NotFoundException('Building not found');

    const [year, month] = period.split('-');
    const from = new Date(Number(year), Number(month) - 1, 1);
    const to = new Date(Number(year), Number(month), 0);

    const expenses = await this.expenseRepo.find({
      where: {
        building: { id: buildingId },
        date: Between(from, to),
      },
    });

    if (!expenses.length)
      throw new BadRequestException('No expenses found for this period');

    const units = await this.unitRepo.find({
      where: { building: { id: buildingId } },
    });

    const totalSquareMeters = units.reduce((acc, u) => acc + u.squareMeters, 0);
    if (totalSquareMeters === 0)
      throw new BadRequestException('Total square meters is zero');

    const totalAmount = expenses.reduce((acc, e) => acc + e.amount, 0);

    const settlement = this.settlementRepo.create({ period, building });
    await this.settlementRepo.save(settlement);

    for (const unit of units) {
      const percentage = unit.squareMeters / totalSquareMeters;
      const chargeAmount = Math.round(percentage * totalAmount * 100) / 100;

      const charge = this.chargeRepo.create({
        amount: chargeAmount,
        unit,
        settlement,
        status: 'pendiente',
        dueDate: new Date(),
      });

      await this.chargeRepo.save(charge);
    }

    return { settlement, totalAmount, totalUnits: units.length };
  }

  findAll() {
    return this.settlementRepo.find({ relations: ['building', 'charges'] });
  }
}
