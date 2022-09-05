import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop()
  rollNo: string;

  @Prop()
  standard: string;

  @Prop()
  noOfsubject: number;
}

export const StudentSchema=SchemaFactory.createForClass(Student)
