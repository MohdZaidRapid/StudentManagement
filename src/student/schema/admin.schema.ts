import * as mongoose from 'mongoose';
import { Admin } from '../StudentInterace/admin.interface';

export const adminSchema = new mongoose.Schema<Admin>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);
