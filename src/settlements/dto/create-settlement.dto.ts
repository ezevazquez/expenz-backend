import { IsString, IsNumber } from 'class-validator';

export class CreateSettlementDto {
  @IsString()
  period: string;

  @IsNumber()
  buildingId: number;
}
