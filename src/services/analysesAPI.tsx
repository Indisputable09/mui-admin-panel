import axios from 'axios';
import { toast } from 'react-toastify';
import { IAnalysis } from '../types/analysisTypes';

export const fetchAnalysesList = async () => {
  try {
    const response = await axios.get('/analysis');
    return response.data.data;
  } catch (error) {}
};

export const fetchAnalysisById = async (id: string) => {
  try {
    const response = await axios.get(`/analysis/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendAnalysesData = async (id: string, data: IAnalysis) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (!data.code) {
      toast.error(`Поле "Код" обов'язкове`);
    } else if (!data.categories) {
      toast.error(`Поле "Категорії" обов'язкове`);
    } else if (!data.prices) {
      toast.error(`Ціни обов'язкові`);
    } else {
      const response = await axios.put(`/analysis/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteAnalysis = async (id: string) => {
  try {
    const response = await axios.delete(`/analysis/${id}`);
    toast.success('Аналіз видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddAnalysis = async (data: IAnalysis) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (!data.code) {
      toast.error(`Поле "Код" обов'язкове`);
    } else if (!data.categories) {
      toast.error(`Поле "Категорії" обов'язкове`);
    } else if (!data.prices) {
      toast.error(`Ціни обов'язкові`);
    } else {
      const response = await axios.post('/analysis/add', data);
      toast.success('Аналіз додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
