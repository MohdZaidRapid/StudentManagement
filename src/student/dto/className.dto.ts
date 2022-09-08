import { IsString } from 'class-validator';

export class ClassNameDto {
  @IsString()
  className: string;
}
