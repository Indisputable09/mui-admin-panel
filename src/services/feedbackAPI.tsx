import axios from 'axios';
import { toast } from 'react-toastify';
import { IFeedback } from '../types/feedbackTypes';

export const fetchFeedbacksList = async () => {
  try {
    const response = await axios.get('/testimonial');
    return response.data.data;
  } catch (error) {}
};

export const fetchFeedbacksById = async (id: string) => {
  try {
    const response = await axios.get(`/testimonial/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendFeedbackData = async (id: string, data: IFeedback) => {
  try {
    if (!data.name) {
      toast.error(`Поле "Ім'я" обов'язкове`);
    } else if (!data.publicationDate) {
      toast.error(`Поле "Дата публікації" обов'язкове`);
    } else if (!data.rate) {
      toast.error(`Поле "Оцінка" обов'язкове`);
    } else if (data.rate > 5) {
      toast.error(`Оцінка не може бути більше 5`);
    } else if (data.rate < 0) {
      toast.error(`Оцінка не може бути менше 0`);
    } else if (!data.comment) {
      toast.error(`Поле "Відгук" обов'язкове`);
    } else {
      const response = await axios.put(`/testimonial/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteFeedback = async (id: string) => {
  try {
    const response = await axios.delete(`/testimonial/${id}`);
    toast.success('Відгук видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
export const handleAddFeedback = async (data: IFeedback) => {
  try {
    if (!data.name) {
      toast.error(`Поле "Ім'я" обов'язкове`);
    } else if (!data.publicationDate) {
      toast.error(`Поле "Дата публікації" обов'язкове`);
    } else if (!data.rate) {
      toast.error(`Поле "Оцінка" обов'язкове`);
    } else if (data.rate > 5) {
      toast.error(`Оцінка не може бути більше 5`);
    } else if (data.rate < 0) {
      toast.error(`Оцінка не може бути менше 0`);
    } else if (!data.comment) {
      toast.error(`Поле "Відгук" обов'язкове`);
    } else {
      const response = await axios.post('/testimonial/add', data);
      toast.success('Відгук додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
