import axios from 'axios';
import { toast } from 'react-toastify';
import { IAnalysisCategory } from '../types/analysisCategoryTypes';

export const fetchAnalysesCategoriesList = async () => {
  try {
    const response = await axios.get('/analysis-category');
    return response.data.data;
  } catch (error) {}
};

export const fetchAnalysisCategoryById = async (id: string) => {
  try {
    const response = await axios.get(`/analysis-category/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const editAnalysisCategoryById = async (
  id: string,
  data: IAnalysisCategory
) => {
  try {
    const response = await axios.put(`/analysis-category/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendAnalysesCategoryData = async (
  id: string,
  data: IAnalysisCategory
) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else {
      await editAnalysisCategoryById(id, data);
    }
  } catch (error) {}
};

export const deleteAnalysisCategoryById = async (id: string) => {
  try {
    const response = await axios.delete(`/analysis-category/${id}`);
    toast.success('Категорію видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteAnalysisCategory = async (id: string) => {
  try {
    await deleteAnalysisCategoryById(id as string);
  } catch (error) {}
};

export const addNewAnalysisCategory = async (data: IAnalysisCategory) => {
  try {
    const response = await axios.post('/analysis-category/add', data);
    toast.success('Аналіз додано');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddAnalysisCategory = async (data: IAnalysisCategory) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else {
      await addNewAnalysisCategory(data);
    }
  } catch (error) {}
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`/analysis-category/selections`);
    return response.data.data;
  } catch (error) {}
};
