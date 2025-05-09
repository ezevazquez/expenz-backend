import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './expense.entity';
import { Building } from '../buildings/building.entity';
import { Provider } from '../providers/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Building, Provider])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
