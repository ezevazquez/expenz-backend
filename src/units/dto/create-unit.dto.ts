import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  number: string;

  @IsNumber()
  squareMeters: number;

  @IsNumber()
  buildingId: number;

  @IsOptional()
  @IsNumber()
  ownerId?: number;

  @IsOptional()
  @IsNumber()
  tenantId?: number;
}
