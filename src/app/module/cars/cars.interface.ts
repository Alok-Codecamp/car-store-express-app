
//create union type for car category 

import { Types } from "mongoose";

type CarCategory = 'Sedan' | 'Hatchback' | 'SUV' | 'Crossover' | 'Coupe' | 'Convertible';
interface RatedUser {
  userId: Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}
interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}
export interface ICars {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  photoUrl: string;
  ratings: {
    average: number;
    count: number;
    breakdown: RatingBreakdown;
    lastRatedAt: Date;
    ratedUsers: RatedUser[];
  }

}