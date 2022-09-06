import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
  @Prop()
  email: string;

  @Prop()
  password: true;

  @Prop()
  name: string;

  @Prop()
  rollNo: string;

  @Prop()
  standard: string;

  @Prop()
  noOfSubject: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
