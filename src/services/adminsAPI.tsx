import axios from 'axios';
import { toast } from 'react-toastify';
import { IAdmin } from '../types/adminTypes';

export const fetchAdminsList = async () => {
  try {
    const response = await axios.get('/admin');
    return response.data.data;
  } catch (error) {}
};

export const fetchAdminById = async (id: string) => {
  try {
    const response = await axios.get(`/admin/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendAdminData = async (id: string, data: IAdmin) => {
  try {
    // if (!data.url) {
    //   toast.error(`Поле "URL" обов'язкове`);
    // } else if (data.name.some(item => !item.value)) {
    //   toast.error(`Поле "Назва" обов'язкове`);
    // } else if (data.shortDescription.some(item => !item.value)) {
    //   toast.error(`Поле "Короткий опис" обов'язкове`);
    // } else if (data.description.some(item => !item.value)) {
    //   toast.error(`Поле "Опис" обов'язкове`);
    // } else if (!data.publicationDate) {
    //   toast.error(`Поле "Дата публікації" обов'язкове`);
    // } else {
    const response = await axios.put(`/admin/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteAdmin = async (id: string) => {
  try {
    const response = await axios.delete(`/admin/${id}`);
    toast.success('Користувача видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddAdmin = async (data: IAdmin) => {
  try {
    // if (!data.url) {
    //   toast.error(`Поле "URL" обов'язкове`);
    // } else if (data.name.some(item => !item.value)) {
    //   toast.error(`Поле "Назва" обов'язкове`);
    // } else if (data.shortDescription.some(item => !item.value)) {
    //   toast.error(`Поле "Короткий опис" обов'язкове`);
    // } else if (data.description.some(item => !item.value)) {
    //   toast.error(`Поле "Опис" обов'язкове`);
    // } else if (!data.publicationDate) {
    //   toast.error(`Поле "Дата публікації" обов'язкове`);
    // } else {
    const response = await axios.post('/admin/add', data);
    toast.success('Користувача додано');
    return response.data.data;
    // }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
