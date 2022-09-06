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
  noOfSubject: number;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
