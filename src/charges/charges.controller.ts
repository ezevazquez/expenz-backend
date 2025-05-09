import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ChargesService } from './charges.service';
import { UpdateChargeStatusDto } from './dto/update-charge-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('charges')
export class ChargesController {
  constructor(private readonly service: ChargesService) {}

  @Roles('admin')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('admin')
  @Get('unit/:unitId')
  findByUnit(@Param('unitId', ParseIntPipe) unitId: number) {
    return this.service.findByUnit(unitId);
  }

  @Roles('admin')
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChargeStatusDto,
  ) {
    return this.service.updateStatus(id, dto);
  }
}
