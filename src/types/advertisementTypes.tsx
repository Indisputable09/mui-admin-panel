export interface IHeaderAdvertisement {
  image: string | null;
  published: boolean;
  discount: string | null;
  name: string;
  text1: { code: string; value: string }[];
  text2: { code: string; value: string }[];
}

export interface ICatalogAdvertisement {
  image: string | null;
  published: boolean;
  discount: string | null;
  url: string;
  name: string;
  text1: { code: string; value: string }[];
}
