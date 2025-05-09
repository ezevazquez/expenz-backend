import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Building } from '../buildings/building.entity';
import { Provider } from '../providers/provider.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>,
    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,
  ) {}

  async create(dto: CreateExpenseDto) {
    const building = await this.buildingRepo.findOneBy({ id: dto.buildingId });
    if (!building) throw new NotFoundException('Building not found');

    const expense = this.expenseRepo.create({
      description: dto.description,
      amount: dto.amount,
      date: new Date(dto.date),
      type: dto.type,
      building,
    });

    if (dto.providerId) {
      const provider = await this.providerRepo.findOneBy({
        id: dto.providerId,
      });
      if (!provider) throw new NotFoundException('Provider not found');
      expense.provider = provider;
    }

    return this.expenseRepo.save(expense);
  }

  findAll() {
    return this.expenseRepo.find({ relations: ['building', 'provider'] });
  }
}
