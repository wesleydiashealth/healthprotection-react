import RelationData from './RelationData';
import ProductData from './ProductData';

export default interface NutraceuticalData {
  slug: string;
  title: string;
  dosage: string;
  info: {
    slug: string;
    title: string;
    dosage: number;
    dosageUnit: string;
    link: string;
    description: string;
    relations: RelationData[];
    studies: number;
    products: ProductData[];
  };
}
