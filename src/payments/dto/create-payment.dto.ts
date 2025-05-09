import {
  IsNumber,
  IsEnum,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  chargeId: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsEnum(['efectivo', 'transferencia', 'tarjeta'])
  method: 'efectivo' | 'transferencia' | 'tarjeta';

  @IsOptional()
  @IsString()
  reference?: string;
}
