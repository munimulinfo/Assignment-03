import { Types } from 'mongoose';
import { TReview } from '../Review/review.interface';

export type TDetails = {
  level: string;
  description: string;
};

export type Tag = {
  name: string;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: Tag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: TDetails;
  durationInWeeks?: number;
  reviews?: TReview[];
};
