import * as mongoose from 'mongoose';
import { className } from '../StudentInterace/className.interface';

export const ClassSchema = new mongoose.Schema<className>(
  {
    className: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
