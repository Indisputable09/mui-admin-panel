import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { attributesRows } from '../TableRows/TableRows';
import { attributesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

const AttributesPage: React.FC = () => {
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();

  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link: '/products/attributes',
          pageName: 'Атрибути',
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        Атрибути
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={attributesColumns}
        rows={attributesRows}
      />
    </>
  );
};

export default AttributesPage;
