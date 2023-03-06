import { Dayjs } from 'dayjs';

export interface IFeedback {
  name: string;
  phone: string;
  email: string;
  publicationDate: Date | Dayjs | null | string;
  published: boolean;
  rate: number | null;
  comment: string;
}
