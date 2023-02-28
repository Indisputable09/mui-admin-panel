import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Checkbox from '@mui/material/Checkbox';
import { authUser } from '../services/authAPI';

interface LoginPageProps {
  setLoggedIn: (user: boolean) => void;
}

const theme = createTheme();

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
      default:
        return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user: { status: string; message: string; token: string } =
        await authUser({ email, password });
      if (remember) {
        localStorage.setItem('token', user.token);
      } else {
        sessionStorage.setItem('token', user.token);
      }
      setLoggedIn(true);
    } catch (error) {}
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if ('Enter' === e.key) {
      e.preventDefault();
      try {
        const user: { status: string; message: string; token: string } =
          await authUser({ email, password });
        if (remember) {
          localStorage.setItem('token', user.token);
        } else {
          sessionStorage.setItem('token', user.token);
        }
        setLoggedIn(true);
      } catch (error) {}
    }
  };

  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#969287' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Логін
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          onKeyPress={handleKeyPress}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Пошта"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={remember}
              onChange={handleRememberChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ mr: 1 }}
            />
            <p>Запам&apos;ятати мене?</p>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={email === '' || password === ''}
          >
            Увійти
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
