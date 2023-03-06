import axios from 'axios';
import { toast } from 'react-toastify';
import { IAction } from '../types/actionTypes';

export const fetchActionsList = async () => {
  try {
    const response = await axios.get('/sale');
    return response.data.data;
  } catch (error) {}
};

export const fetchActionById = async (id: string) => {
  try {
    const response = await axios.get(`/sale/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const editActionById = async (id: string, data: IAction) => {
  try {
    const response = await axios.put(`/sale/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendActionData = async (id: string, data: IAction) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else {
      await editActionById(id, data);
    }
  } catch (error) {}
};

export const deleteActionById = async (id: string) => {
  try {
    const response = await axios.delete(`/sale/${id}`);
    toast.success('Акцію видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteAction = async (id: string) => {
  try {
    await deleteActionById(id as string);
  } catch (error) {}
};

export const addNewAction = async (data: IAction) => {
  try {
    const response = await axios.post('/sale/add', data);
    toast.success('Акцію додано');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddAction = async (data: IAction) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else {
      await addNewAction(data);
    }
  } catch (error) {}
};

export const fetchActions = async () => {
  try {
    const response = await axios.get('/sale/selections');
    return response.data.data;
  } catch (error) {}
};
