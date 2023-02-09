import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { manufacturersColumns } from '../TableColumns/TableColumns';
import { manufacturersRows } from '../TableRows/TableRows';
import { useGlobalContext } from '../hooks/GlobalContext';

const ManufacturersPage: React.FC = () => {
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();
  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link: '/products/manufacturers',
          pageName: 'Виробники',
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        Виробники
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={manufacturersColumns}
        rows={manufacturersRows}
        noCheckAll
        noCopy
      />
    </>
  );
};

export default ManufacturersPage;
