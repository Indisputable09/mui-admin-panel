import axios from 'axios';
import { toast } from 'react-toastify';
import { IAnalysisPackage } from '../types/analysisPackageTypes';

export const fetchAnalysesPackagesList = async () => {
  try {
    const response = await axios.get('/complex');
    return response.data.data;
  } catch (error) {}
};

export const fetchAnalysisPackageById = async (id: string) => {
  try {
    const response = await axios.get(`/complex/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendAnalysesPackageData = async (
  id: string,
  data: IAnalysisPackage
) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.shortDescription.some(item => !item.value)) {
      toast.error(`Поле "Короткий опис" обов'язкове`);
    } else if (!data.code) {
      toast.error(`Поле "Код" обов'язкове`);
    } else if (!data.analyses) {
      toast.error(`Поле "Категорії" обов'язкове`);
    } else if (!data.prices) {
      toast.error(`Ціни обов'язкові`);
    } else {
      const response = await axios.put(`/complex/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteAnalysisPackage = async (id: string) => {
  try {
    const response = await axios.delete(`/complex/${id}`);
    toast.success('Пакет видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddAnalysisPackage = async (data: IAnalysisPackage) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.shortDescription.some(item => !item.value)) {
      toast.error(`Поле "Короткий опис" обов'язкове`);
    } else if (!data.code) {
      toast.error(`Поле "Код" обов'язкове`);
    } else if (!data.analyses) {
      toast.error(`Поле "Категорії" обов'язкове`);
    } else if (!data.prices) {
      toast.error(`Ціни обов'язкові`);
    } else {
      const response = await axios.post('/complex/add', data);
      toast.success('Пакет додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const fetchAnalysesPackages = async () => {
  try {
    const response = await axios.get(`/complex/selections`);
    return response.data.data;
  } catch (error) {}
};
