import {
  IsEmail,
  IsNotEmpty,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  rollNo: string;

  @IsString()
  standard: string;

  @IsInt()
  @IsNotEmpty()
  noOfSubject: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
