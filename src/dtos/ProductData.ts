/* eslint-disable camelcase */
export default interface ProductData {
  asin: string;
  title: string;
  url: string;
  image: string;
  rating: string;
  star_rating: string;
  reviews: string;
  price: string;
  list_price: string | null;
  amount_saved: number;
  percentage_saved: number;
  last_update: string;
  name: string;
  brand: string;
  dosageCapsule: number;
  capsules: number;
  nutraceutical?: string;
  quantity?: number;
}
