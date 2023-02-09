import { navBarMenuItems } from '../components/NavBarMenu/NavBarMenuContent';

const allRoutes = navBarMenuItems.map(mainItem => {
  if (mainItem.items) {
    const newArray = mainItem.items?.map(subItem => {
      const { Component, DataComponent, link, name } = subItem;
      return [
        {
          path: link,
          component: <Component pageName={name} link={link} />,
        },
        {
          path: `${link}/:id/edit`,
          component: <DataComponent initialLink={link} pageName={name} />,
        },
        {
          path: `${link}/add`,
          component: <DataComponent initialLink={link} pageName={name} />,
        },
      ];
    });
    const data = newArray.flat(1);
    return data;
  } else {
    const { Component, link } = mainItem;
    return [{ path: link, component: <Component /> }];
  }
});

export const routes = allRoutes.flat(1);
