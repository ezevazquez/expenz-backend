import { IsOptional, IsString } from 'class-validator';

export class CreateProviderDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cuit?: string;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
