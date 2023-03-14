export interface IPageWithSeo {
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface IMainPage {
  banners: {
    additionalColor: string;
    primaryColor: string;
    image: null | string;
    imageMobile: null | string;
    imageDesktop: null | string;
    primaryText: { code: string; value: string }[];
    additionalText: { code: string; value: string }[];
    url: string;
  }[];
  analyses: number[] | null;
  complexes: number[] | null;
  sales: number[] | null;
  news: number[] | null;
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  texts: {
    name: { code: string; value: string }[];
  }[];
  copyright: { code: string; value: string }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  name: string;
  indexed: boolean;
}

export interface IAnalysesAtHomePage {
  banner: {
    additionalColor: string;
    primaryColor: string;
    primaryText: { code: string; value: string }[];
    additionalText: { code: string; value: string }[];
    image: null | string;
    imageMobile: null | string;
    imageDesktop: null | string;
  };
  faqs: number[] | null;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
  service: {
    image: string | null;
    title: { code: string; value: string }[];
    text: { code: string; value: string }[];
  };
  steps: {
    image: string | null;
    title: { code: string; value: string }[];
    text: { code: string; value: string }[];
  }[];
  weekdaysOrdersSchedule: string;
  weekendOrdersSchedule: string;
  weekdaysDrivingSchedule: string;
  weekendDrivingSchedule: string;
}

export interface ICovidPage {
  analyses: number[] | null;
  advices: {
    name: { code: string; value: string }[];
    title: { code: string; value: string }[];
    text: { code: string; value: string }[];
  }[];
  banner: {
    additionalColor: string;
    primaryColor: string;
    primaryText: { code: string; value: string }[];
    additionalText: { code: string; value: string }[];
    image: null | string;
    imageMobile: null | string;
    imageDesktop: null | string;
  };
  faqs: number[] | null;
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface ICoworkingPage {
  banner: {
    additionalColor: string;
    primaryColor: string;
    primaryText: { code: string; value: string }[];
    additionalText: { code: string; value: string }[];
    imageMobile: null | string;
    imageDesktop: null | string;
  };
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface IFranchisePage {
  banner: {
    additionalColor: string;
    primaryColor: string;
    primaryText: { code: string; value: string }[];
    additionalText: { code: string; value: string }[];
    imageMobile: null | string;
    imageDesktop: null | string;
  };
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface IAboutLaboratoryPage {
  banner: {
    additionalColor: string;
    primaryColor: string;
    image: string | null;
    imageMobile: string | null;
    imageDesktop: null | string;
    primaryText: {
      code: string;
      value: string;
    }[];
    additionalText: {
      code: string;
      value: string;
    }[];
  };
  aboutImage: string | null;
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  blocks: {
    value: number | null;
    text: { code: string; value: string }[];
  }[];
  bottomText: { code: string; value: string }[];
  mission: { code: string; value: string }[];
  values: {
    text: { code: string; value: string }[];
  }[];
  slider: string[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface IQualityPoliticsPage {
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  image: string | null;
  mobileImage: string | null;
  gallery: { image: string | null }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}
