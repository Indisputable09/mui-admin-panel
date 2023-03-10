import axios from 'axios';
import { toast } from 'react-toastify';
import {
  IAboutLaboratoryPage,
  IAnalysesAtHomePage,
  ICovidPage,
  ICoworkingPage,
  IFranchisePage,
  IMainPage,
  IPageWithSeo,
  IQualityPoliticsPage,
} from '../types/pagesTypes';

export const fetchPagesList = async () => {
  try {
    const response = await axios.get('/page');
    return response.data.data;
  } catch (error) {}
};

export const fetchPageById = async (id: string) => {
  try {
    const response = await axios.get(`/page/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendPageWithSeoData = async (
  id: string,
  data: IPageWithSeo
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendMainPageData = async (id: string, data: IMainPage) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendAnalysesAtHomePageData = async (
  id: string,
  data: IAnalysesAtHomePage
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendCovidPageData = async (id: string, data: ICovidPage) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendCoworkingPageData = async (
  id: string,
  data: ICoworkingPage
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendFranchisePageData = async (
  id: string,
  data: IFranchisePage
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendAboutLaboratoryPageData = async (
  id: string,
  data: IAboutLaboratoryPage
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendQualityPoliticsPageData = async (
  id: string,
  data: IQualityPoliticsPage
) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
