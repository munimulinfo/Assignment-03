import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: { type: String, required: true, unique: true },
});

categorySchema.pre('save', async function (next) {
  const existingCategory = await CategoryModel.findOne({ name: this?.name });
  if (existingCategory) {
    throw new Error(`${existingCategory?.name} Already Exists`);
  }
  next();
});

export const CategoryModel = model<TCategory>('category', categorySchema);
