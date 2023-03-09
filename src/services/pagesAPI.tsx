import axios from 'axios';
import { toast } from 'react-toastify';

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

export const handleSendPageWithSeoData = async (id: string, data: any) => {
  try {
    const response = await axios.put(`/page/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
