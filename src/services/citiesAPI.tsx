import axios from 'axios';
import { toast } from 'react-toastify';
import { ICity } from '../types/cityTypes';

export const fetchCitiesList = async () => {
  try {
    const response = await axios.get('/city');
    return response.data.data;
  } catch (error) {}
};

export const fetchCityById = async (id: string) => {
  try {
    const response = await axios.get(`/city/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendCityData = async (id: string, data: ICity) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва міста" обов'язкове`);
    } else if (data.address.some(item => !item.value)) {
      toast.error(`Поле "Адреса" обов'язкове`);
    } else if (data.phoneNumbers.some(item => !item)) {
      toast.error(`Поле "Номер телефона" не може бути пустим`);
    } else {
      const response = await axios.put(`/city/${id}`, data);
      toast.success('Дані збережено');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteCity = async (id: string) => {
  try {
    const response = await axios.delete(`/city/${id}`);
    toast.success('Місто видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddCity = async (data: ICity) => {
  try {
    if (!data.url) {
      toast.error(`Поле "URL" обов'язкове`);
    } else if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва міста" обов'язкове`);
    } else if (data.address.some(item => !item.value)) {
      toast.error(`Поле "Адреса" обов'язкове`);
    } else if (data.phoneNumbers.some(item => !item)) {
      toast.error(`Поле "Номер телефона" не може бути пустим`);
    } else {
      const response = await axios.post('/city/add', data);
      toast.success('Місто додано');
      return response.data.data;
    }
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const fetchCities = async () => {
  try {
    const response = await axios.get(`/city/selections`);
    return response.data.data;
  } catch (error) {}
};
