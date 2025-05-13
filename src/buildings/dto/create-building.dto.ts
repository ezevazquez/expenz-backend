import { IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  name: string;
  @IsString()
  address: string;
  initialBalance?: number;
  adminId: number;
}
