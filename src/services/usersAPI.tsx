import axios from 'axios';
import { toast } from 'react-toastify';
import { IUser } from '../types/userTypes';

export const fetchUsersList = async () => {
  try {
    const response = await axios.get('/user');
    return response.data.data;
  } catch (error) {}
};

export const fetchUserById = async (id: string) => {
  try {
    const response = await axios.get(`/user/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendUserData = async (id: string, data: IUser) => {
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
    const response = await axios.put(`/user/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
    // }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`/user/${id}`);
    toast.success('Користувача видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddUser = async (data: IUser) => {
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
    const response = await axios.post('/user/add', data);
    toast.success('Користувача додано');
    return response.data.data;
    // }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
