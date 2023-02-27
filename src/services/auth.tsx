import axios from 'axios';

axios.defaults.baseURL = 'https://ortus.artyshok.studio/api/';

const token = {
  set(token: string) {
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
  console.log('password:', credentials.password);
  console.log('email:', credentials.email);
  try {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    const response: any = await axios.post('auth/login', formData);
    token.set(response.data.token);
    // axios.defaults.headers.common[
    //   'Authorization'
    // ] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
