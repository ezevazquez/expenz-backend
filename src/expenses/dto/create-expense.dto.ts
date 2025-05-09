import {
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;

  @IsDateString()
  date: string;

  @IsEnum(['ordinario', 'extraordinario'])
  type: 'ordinario' | 'extraordinario';

  @IsNumber()
  buildingId: number;

  @IsOptional()
  @IsNumber()
  providerId?: number;
}
