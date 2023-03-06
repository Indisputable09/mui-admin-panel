import axios from 'axios';
import { toast } from 'react-toastify';
import { ILanguage } from '../types/languageTypes';

export const fetchLanguagesList = async () => {
  try {
    const response = await axios.get('/language');
    return response.data.data;
  } catch (error) {}
};

export const fetchLanguageById = async (id: string) => {
  try {
    const response = await axios.get(`/language/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendLanguageData = async (id: string, data: ILanguage) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (!data.language) {
      toast.error(`Поле "Мова" обов'язкове`);
    } else if (!data.iso) {
      toast.error(`Поле "ISO" обов'язкове`);
    } else if (data.iso.length !== 2) {
      toast.error(`Поле "ISO" має містити 2 символи`);
    } else {
      const response = await axios.put(`/language/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteLanguage = async (id: string) => {
  try {
    const response = await axios.delete(`/language/${id}`);
    toast.success('Мову видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddLanguage = async (data: ILanguage) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (!data.language) {
      toast.error(`Поле "Мова" обов'язкове`);
    } else if (!data.iso) {
      toast.error(`Поле "ISO" обов'язкове`);
    } else if (data.iso.length !== 2) {
      toast.error(`Поле "ISO" має містити 2 символи`);
    } else {
      const response = await axios.post('/language/add', data);
      toast.success('Мову додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`/language/selections`);
    return response.data.data;
  } catch (error) {}
};
