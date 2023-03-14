import axios from 'axios';
import { toast } from 'react-toastify';
import { IRobots } from '../types/robotsTypes';

export const fetchGtm = async () => {
  try {
    const response = await axios.get(`/gtm`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendGtmData = async (data: IRobots) => {
  try {
    const response = await axios.put(`/gtm`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
