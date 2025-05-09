import { IsNumber, IsString } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  number: string;

  @IsNumber()
  squareMeters: number;

  @IsNumber()
  buildingId: number;
}
