import { Document } from 'mongoose';
export interface Student extends Document {
  name: string;
  email: string;
  rollNo: string;
  standard: string;
  password: string;
  noOfSubject: number;
}
