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

export const editNewsById = async (id: string, data: INews) => {
  try {
    const response = await axios.put(`/news/${id}`, data);
    return response.data.data;
  } catch (error) {}
};

export const handleSendData = async (id: string, data: INews) => {
  try {
    await editNewsById(id, data);
    toast.success('Дані збережено');
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const deleteNewsById = async (id: string) => {
  try {
    const response = await axios.delete(`/news/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleDeleteNews = async (id: string) => {
  try {
    await deleteNewsById(id as string);
    toast.success('Новину видалено');
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
