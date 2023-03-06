import axios from 'axios';
import { toast } from 'react-toastify';
import { INews } from '../types/newsTypes';

export const fetchNewsList = async () => {
  try {
    const response = await axios.get('/news');
    return response.data.data;
  } catch (error) {}
};

export const fetchNewsById = async (id: string) => {
  try {
    const response = await axios.get(`/news/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendNewsData = async (id: string, data: INews) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.shortDescription.some(item => !item.value)) {
      toast.error(`Поле "Короткий опис" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else if (!data.publicationDate) {
      toast.error(`Поле "Дата публікації" обов'язкове`);
    } else {
      const response = await axios.put(`/news/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteNews = async (id: string) => {
  try {
    const response = await axios.delete(`/news/${id}`);
    toast.success('Новину видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddNews = async (data: INews) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.shortDescription.some(item => !item.value)) {
      toast.error(`Поле "Короткий опис" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else if (!data.publicationDate) {
      toast.error(`Поле "Дата публікації" обов'язкове`);
    } else {
      const response = await axios.post('/news/add', data);
      toast.success('Новину додано');
      return response.data.data;
    }
  } catch (error) {}
};

export const fetchRecommendedNews = async (id?: string) => {
  try {
    const response = await axios.get('/news/selections', {
      params: {
        except: Number(id),
      },
    });
    return response.data.data;
  } catch (error) {}
};
