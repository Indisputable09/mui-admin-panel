import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const token = {
  set(token: string | null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

export async function authUser(credentials: {
  email: string;
  password: string;
}) {
  try {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    const response: any = await axios.post('auth/login', formData);
    token.set(response.data.token);
    toast.success('Вхід пройшов успішно!');
    return response.data;
  } catch (error: any) {
    console.error(error.response.status);
    if (error.response.status === 401) {
      toast.error('Логін або пароль не вірні. Спробуйте ще раз');
    } else {
      toast.error('Щось пішло не так. Спробуйте ще раз');
    }
  }
}

export async function fetchUserData() {
  try {
    const response: any = await axios.get('profile');
    return response.data.data;
  } catch (error) {}
}
