import { IsEnum, IsDateString } from 'class-validator';

export class UpdateChargeStatusDto {
  @IsEnum(['pendiente', 'pagado'])
  status: 'pendiente' | 'pagado';

  @IsDateString()
  paidAt: string;
}
