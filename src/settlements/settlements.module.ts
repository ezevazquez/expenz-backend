import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettlementsService } from './settlements.service';
import { SettlementsController } from './settlements.controller';
import { Settlement } from './settlement.entity';
import { Building } from '../buildings/building.entity';
import { Expense } from '../expenses/expense.entity';
import { Unit } from '../units/unit.entity';
import { Charge } from '../charges/charge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Settlement, Building, Expense, Unit, Charge]),
  ],
  controllers: [SettlementsController],
  providers: [SettlementsService],
  exports: [SettlementsService],
})
export class SettlementsModule {}
