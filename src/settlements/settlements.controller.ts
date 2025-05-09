import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { SettlementsService } from './settlements.service';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('settlements')
export class SettlementsController {
  constructor(private readonly service: SettlementsService) {}

  @Roles('admin')
  @Post()
  create(@Body() dto: CreateSettlementDto) {
    return this.service.create(dto);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.service.findAll();
  }
}
