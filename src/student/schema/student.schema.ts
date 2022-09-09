import * as mongoose from 'mongoose';
import { Student } from '../StudentInterace/studen.interface';

export const StudentSchema = new mongoose.Schema<Student>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rollNo: { type: String, required: true },
    standard: { type: String, required: true },
    password: { type: String, required: true, select: false },
    noOfSubject: { type: Number, requried: true },
  },
  {
    timestamps: true,
  },
);
