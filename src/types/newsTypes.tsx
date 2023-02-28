import { Dayjs } from 'dayjs';

export interface INews {
  name: { code: string; value: string }[];
  shortDescription: { code: string; value: string }[];
  description: { code: string; value: string }[];
  image: null;
  published: boolean;
  publicationDate: Date | Dayjs | null | string;
  url: string;
  recommendedNews: string[] | null;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
}
