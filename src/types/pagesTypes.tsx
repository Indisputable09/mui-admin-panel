export interface IPageWithSeo {
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}
