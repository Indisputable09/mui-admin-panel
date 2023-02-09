import React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useNavBarMenuStyles } from './NavBarMenu.styles';
import NavBarMenuItem from '../NavBarMenuItem';
import { navBarMenuItems } from './NavBarMenuContent';
import { Drawer, FormControlLabel } from '@mui/material';
import { useNavBarStyles } from '../NavBar/NavBar.styles';
import { ThemeSwitcherStyled } from './NavBarMenu.styles';

interface INavBarMenuProps {
  toggleDrawer: (open: boolean) => void;
  openDrawer: boolean;
  handleThemeClick: () => void;
  darkTheme: boolean;
}

const NavBarMenu: React.FC<INavBarMenuProps> = ({
  toggleDrawer,
  openDrawer,
  handleThemeClick,
  darkTheme,
}) => {
  const { classes } = useNavBarMenuStyles();
  const { classes: nbClasses, cx } = useNavBarStyles();
  const [dark, setDark] = React.useState<boolean>(darkTheme ?? false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDark(event.target.checked);
    handleThemeClick();
  };
  localStorage.setItem('THEME_MODE', dark ? 'dark' : 'light');

  const handleDrawerClick = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).nodeName === 'INPUT' ?? openDrawer) {
      return;
    } else if (!openDrawer && (e.target as HTMLElement).nodeName !== 'INPUT') {
      toggleDrawer(true);
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: cx(
            nbClasses.drawerPaper,
            openDrawer ? 'active' : null,
            darkTheme ? 'dark' : null
          ),
        }}
        onClick={handleDrawerClick}
      >
        <List
          component="nav"
          className={cx(classes.navBarMenu, darkTheme ? 'dark' : null)}
          disablePadding
        >
          {navBarMenuItems.map((item, index) => (
            <React.Fragment key={index}>
              <NavBarMenuItem
                {...item}
                darkTheme={darkTheme}
                openDrawer={openDrawer}
              />
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <FormControlLabel
          className={cx(classes.switcherControl, darkTheme ? 'dark' : null)}
          label="Перемкнути тему"
          control={
            <ThemeSwitcherStyled
              sx={{ m: 1 }}
              checked={dark}
              onChange={handleChange}
            />
          }
        />
      </Drawer>
    </>
  );
};

export default NavBarMenu;
