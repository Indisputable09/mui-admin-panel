import axios from 'axios';
import { toast } from 'react-toastify';
import { IVacancy } from '../types/vacancyTypes';

export const fetchVacanciesList = async () => {
  try {
    const response = await axios.get('/vacancy');
    return response.data.data;
  } catch (error) {}
};

export const fetchVacancyById = async (id: string) => {
  try {
    const response = await axios.get(`/vacancy/${id}`);
    return response.data.data;
  } catch (error) {}
};

export const editVacancyById = async (id: string, data: IVacancy) => {
  try {
    const response = await axios.put(`/vacancy/${id}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleSendVacancyData = async (id: string, data: IVacancy) => {
  try {
    if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else {
      await editVacancyById(id, data);
    }
  } catch (error) {}
};

export const deleteVacancyById = async (id: string) => {
  try {
    const response = await axios.delete(`/vacancy/${id}`);
    toast.success('Вакансію видалено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleDeleteVacancy = async (id: string) => {
  try {
    await deleteVacancyById(id as string);
  } catch (error) {}
};

export const addNewVacancy = async (data: IVacancy) => {
  try {
    const response = await axios.post('/vacancy/add', data);
    toast.success('Вакансію додано');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};

export const handleAddVacancy = async (data: IVacancy) => {
  try {
    if (data.name.some(item => !item.value)) {
      toast.error(`Поле "Назва" обов'язкове`);
    } else if (data.description.some(item => !item.value)) {
      toast.error(`Поле "Опис" обов'язкове`);
    } else {
      await addNewVacancy(data);
    }
  } catch (error) {}
};
