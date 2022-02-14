/* eslint-disable camelcase */
import InteractionData from './InteractionData';

export default interface ProductData {
  asin: string;
  brand: string;
  capsules: number;
  interactions: InteractionData[];
  diets: string[];
  allergies: string[];
  additives: string[];
  proprietaries: string[];
  url: string;
  price: string;
  image: string;
  lastUpdate: string;
  rating: string;
  starRating: string;
  reviews: string;
  dietarySupplement?: string;
  quantity?: number;
}
