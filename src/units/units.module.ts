import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/buildings/building.entity';
import { Unit } from './unit.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Building, User])],
  providers: [UnitsService],
  controllers: [UnitsController],
})
export class UnitsModule {}
