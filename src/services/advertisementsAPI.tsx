import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ICatalogAdvertisement,
  IHeaderAdvertisement,
} from '../types/advertisementTypes';

export const fetchAdvertisements = async () => {
  try {
    const response = await axios.get(`/banner`);
    return response.data.data;
  } catch (error) {}
};

export const fetchAdvertisementByType = async (type: string) => {
  try {
    const response = await axios.get(`/banner/${type}`);
    console.log('response.data.data:', response.data.data);
    return response.data.data;
  } catch (error) {}
};

export const handleSendAdvertisementData = async (
  type: string,
  data: IHeaderAdvertisement | ICatalogAdvertisement
) => {
  try {
    const response = await axios.put(`/banner/${type}`, data);
    toast.success('Дані збережено');
    return response.data.data;
  } catch (error) {
    toast.error('Щось пішло не так. Спробуйте ще раз');
  }
};
