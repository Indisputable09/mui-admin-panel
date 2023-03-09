import axios from 'axios';

export const fetchShortcodes = async () => {
  try {
    const response = await axios.get(`/shortcode`);
    return response.data.data;
  } catch (error) {}
};
