export interface IAnalysis {
  name: { code: string; value: string }[];
  shortDescription: { code: string; value: string }[];
  url: string;
  code: string;
  tabs: {
    name: { code: string; value: string }[];
    description: { code: string; value: string }[];
  }[];
  categories: number[] | null;
  deadline: { code: string; value: string }[];
  published: boolean;
  makeAtHome: boolean;
  prices:
    | {
        city: null | number;
        price: number;
        priceWithDiscount: number | null;
      }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
}
