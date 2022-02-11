import InteractionData from './InteractionData';

export default interface FoodData {
  slug: string;
  title: string;
  content: string;
  icon: string;
  diet: {
    value: string;
    title: string;
  }[];
  allergy: {
    value: string;
    title: string;
  }[];
  unit: {
    value: string;
    label: string;
  };
  dosages: string;
  interactions: InteractionData[];
  dataSource: string[];
  intakeFrequency: {
    value: string;
    label: string;
  }[];
}
