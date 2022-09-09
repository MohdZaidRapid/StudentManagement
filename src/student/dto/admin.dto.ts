import { IsString } from 'class-validator';

export class AdminDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
