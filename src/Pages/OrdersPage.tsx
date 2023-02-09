import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { ordersRows } from '../TableRows/TableRows';
import { ordersColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

const SalesPage: React.FC = () => {
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();

  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link: '/orders/sales',
          pageName: 'Замовлення',
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        Замовлення
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={ordersColumns}
        rows={ordersRows}
      />
    </>
  );
};

export default SalesPage;
