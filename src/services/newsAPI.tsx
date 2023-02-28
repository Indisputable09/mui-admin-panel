import axios from 'axios';

export const fetchNewsList = async () => {
  try {
    const response = await axios.get('/news');
    return response.data.data;
  } catch (error) {}
};

export const fetchNewsById = async (id: string) => {
  try {
    const response = await axios.get(`/news/${id}`);
    return response.data.data;
  } catch (error) {}
};
