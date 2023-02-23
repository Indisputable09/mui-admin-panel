import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { GlobalContext } from './hooks/GlobalContext';
import Dashboard from './Pages/Dashboard';
import { routes } from './routes';

export const App: React.FC = () => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(true);
  const [darkTheme, setDarkTheme] = React.useState<boolean>(
    localStorage.getItem('THEME_MODE') === 'dark' ? true : false ?? false
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
        <Header
          toggleDrawer={toggleDrawer}
          openDrawer={openDrawer}
          darkTheme={darkTheme}
        />
        <BrowserRouter basename="/mui-admin-panel/">
          <Routes>
            <Route
              path="/"
              element={
                <NavBar
                  toggleDrawer={toggleDrawer}
                  openDrawer={openDrawer}
                  handleThemeClick={handleThemeClick}
                  darkTheme={darkTheme}
                />
              }
            >
              <Route index element={<Dashboard />} />
              {routes.map((route, index) => {
                const { path, component } = route;
                return <Route key={index} path={path} element={component} />;
              })}
              <Route path="*" element={<h1>Error when no link is found</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalContext.Provider>
    </>
  );
};
