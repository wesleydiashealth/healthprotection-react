export default interface RelationData {
  slug: string;
  title: string;
  link: string;
  outcome: {
    slug: string;
    title: string;
    link: string;
  };
  suboutcome: {
    slug: string;
    title: string;
    link: string;
  };
  studies: number;
  evidenceLevel: number;
  magnitudeLevel: number;
  dosages: string;
  dosagesUnit: string;
}
