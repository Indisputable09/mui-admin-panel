import axios from 'axios';
import { toast } from 'react-toastify';
import { IFAQ } from '../types/faqTypes';

export const fetchFAQList = async () => {
  try {
    const response = await axios.get('/faq');
    return response.data.data;
  } catch (error) {}
};

export const fetchFAQById = async (id: string) => {
  try {
    const response = await axios.get(`/faq/${id}`);
    console.log('response.data.data:', response.data.data);
    return response.data.data;
  } catch (error) {}
};

export const handleSendFAQData = async (id: string, data: IFAQ) => {
  try {
    if (data.question.some(item => !item.value)) {
      toast.error(`Поле "Питання" обов'язкове`);
    } else if (data.answer.some(item => !item.value)) {
      toast.error(`Поле "Відповідь" обов'язкове`);
    } else {
      const response = await axios.put(`/faq/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteFAQ = async (id: string) => {
  try {
    const response = await axios.delete(`/faq/${id}`);
    toast.success('Питання видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
export const handleAddFAQ = async (data: IFAQ) => {
  try {
    if (data.question.some(item => !item.value)) {
      toast.error(`Поле "Питання" обов'язкове`);
    } else if (data.answer.some(item => !item.value)) {
      toast.error(`Поле "Відповідь" обов'язкове`);
    } else {
      const response = await axios.post('/faq/add', data);
      toast.success('Питання додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const fetchFAQ = async () => {
  try {
    const response = await axios.get('/faq/selections');
    return response.data.data;
  } catch (error) {}
};
