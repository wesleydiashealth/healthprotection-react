import InteractionData from './InteractionData';

export default interface FoodData {
  slug: string;
  title: string;
  icon: string;
  diets: {
    slug: string;
    title: string;
  }[];
  allergies: {
    slug: string;
    title: string;
  }[];
  unit: {
    value: string;
    label: string;
  };
  dosages: string;
  intakeFrequency: {
    value: string;
    label: string;
  }[];
  frequencyUnit: {
    value: string;
    label: string;
  };
  interactions: InteractionData[];
  portion: string;
  portions: number[];
}
