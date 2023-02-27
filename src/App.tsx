import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import { GlobalContext } from './hooks/GlobalContext';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import { routes } from './routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

export const App: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(true);
  const [darkTheme, setDarkTheme] = React.useState<boolean>(
    localStorage.getItem('THEME_MODE') === 'dark' ? true : false ?? false
  );
  const [loggedIn, setLoggedIn] = React.useState<boolean>(
    localStorage.getItem('token') || sessionStorage.getItem('token')
      ? true
      : false
  );

  const handleThemeClick = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleDrawer = (open: boolean) => {
    setOpenDrawer(open);
  };

  return (
    <>
      <GlobalContext.Provider value={{ darkTheme }}>
        <BrowserRouter basename="/mui-admin-panel/">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute user={loggedIn} redirectTo={'/login'}>
                  <NavBar
                    toggleDrawer={toggleDrawer}
                    openDrawer={openDrawer}
                    handleThemeClick={handleThemeClick}
                    darkTheme={darkTheme}
                    setLoggedIn={setLoggedIn}
                  />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              {routes.map((route, index) => {
                const { path, component } = route;
                return <Route key={index} path={path} element={component} />;
              })}
              <Route path="*" element={<h1>Error when no link is found</h1>} />
            </Route>

            <Route
              path="/login"
              element={
                <PublicRoute restricted redirectTo="/dashboard" user={loggedIn}>
                  <LoginPage setLoggedIn={setLoggedIn} />
                </PublicRoute>
              }
            />
            <Route path="*" element={<h1>Error when no link is found</h1>} />
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
};
