/* eslint-disable camelcase */
export default interface ProductData {
  asin: string;
  brand: string;
  order: number;
  dosageValue: number;
  dosageUnit: string;
  capsuleDosage: number;
  capsuleDosageUnit: string;
  capsules: number;
  nutraceutical: string;
  diets: string[];
  allergies: string[];
  additives: string[];
  proprietaries: string[];
  url: string;
  image: string;
  rating: string;
  starRating: string;
  reviews: string;
  price: string;
  lastUpdate: string;
  quantity?: number;
}
