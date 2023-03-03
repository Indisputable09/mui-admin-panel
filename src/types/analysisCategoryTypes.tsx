export interface IAnalysisCategory {
  name: { code: string; value: string }[];
  url: string;
  sort: number;
  top: boolean;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
}
