export interface ICity {
  name: { code: string; value: string }[];
  url: string;
  phoneNumbers: string[];
  address: { code: string; value: string }[];
  workingHours: { code: string; value: string }[];
  email: string;
  mapLink: string;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
}
