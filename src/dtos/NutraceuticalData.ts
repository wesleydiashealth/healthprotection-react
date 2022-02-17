import RelationData from './RelationData';

export default interface NutraceuticalData {
  slug: string;
  title: string;
  link: string;
  description: string;
  dosage: string;
  dosages: number[];
  maxDosage: number;
  dosageUnit: string;
  relations: RelationData[];
  studies: number;
}
