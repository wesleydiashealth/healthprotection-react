export default interface HabitData {
  food: string;
  unit: {
    value: string;
    label: string;
  };
  icon: string;
  frequency: {
    value: string;
    label: string;
  };
  frequencyIndex: number;
}
