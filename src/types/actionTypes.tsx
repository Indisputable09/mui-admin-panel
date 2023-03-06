import { Dayjs } from 'dayjs';

export interface IAction {
  name: { code: string; value: string }[];
  description: { code: string; value: string }[];
  image: null | string;
  analyses: number[] | null;
  finishDate: Date | Dayjs | null | string;
  published: false;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  url: string;
}
