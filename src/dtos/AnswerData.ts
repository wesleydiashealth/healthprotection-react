export default interface AnswerData {
  question: {
    slug: string;
    label: string;
  };
  answer: {
    slug: string;
    label: string;
  };
  subAnswer?: AnswerData[];
}
