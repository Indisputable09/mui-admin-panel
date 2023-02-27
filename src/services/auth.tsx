import axios from 'axios';

axios.defaults.baseURL = 'https://ortus.artyshok.studio/api/';

export async function authUser(credentials: {
  email: string;
  password: string;
}) {
  console.log('password:', credentials.password);
  console.log('email:', credentials.email);
  try {
    // const formData = new FormData();
    // formData.append('email', credentials.email);
    // formData.append('password', credentials.password);
    // console.log('formData:', formData);

    const response = await axios.post('auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    console.log('response:', response);
  } catch (error) {
    console.error(error);
  }
}
