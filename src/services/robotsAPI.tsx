import axios from 'axios';
import { toast } from 'react-toastify';
import { IRobots } from '../types/robotsTypes';

export const fetchRobots = async () => {
  try {
    const response = await axios.get(`/robots`);
    return response.data.data;
  } catch (error) {}
};

export const handleSendRobotsData = async (data: IRobots) => {
  try {
    const response = await axios.put(`/robots`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
