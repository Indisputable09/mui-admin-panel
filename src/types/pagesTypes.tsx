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
  image: string | null;
  mobileImage: string | null;
  analyses: number[] | null;
  data: {
    primaryText: {
      color: string;
      text: { code: string; value: string }[];
    };
    additionalText: {
      color: string;
      text: { code: string; value: string }[];
    };
    banners: {
      name: { code: string; value: string }[];
      description: { code: string; value: string }[];
    }[];
  };
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface ICoworkingPage {
  image: string | null;
  mobileImage: string | null;
  primaryText: {
    color: string;
    text: { code: string; value: string }[];
  };
  additionalText: {
    color: string;
    text: { code: string; value: string }[];
  };
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  metaTitle: { code: string; value: string }[];
  metaDescription: { code: string; value: string }[];
  indexed: boolean;
  name: string;
}

export interface IFranchisePage {
  image: string | null;
  mobileImage: string | null;
  primaryText: {
    color: string;
    text: { code: string; value: string }[];
  };
  additionalText: {
    color: string;
    text: { code: string; value: string }[];
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
    image: string | null;
    mobileImage: string | null;
    primaryText: {
      color: string;
      text: { code: string; value: string }[];
    };
    additionalText: {
      color: string;
      text: { code: string; value: string }[];
    };
  };
  title: { code: string; value: string }[];
  description: { code: string; value: string }[];
  tabs: {
    quantity: number;
    name: { code: string; value: string }[];
  }[];

  goal: { code: string; value: string }[];
  values: {
    name: { code: string; value: string }[];
  }[];
  gallery: { image: string | null }[];
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
