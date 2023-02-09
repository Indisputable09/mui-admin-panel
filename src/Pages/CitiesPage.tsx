import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { citiesColumns } from '../TableColumns/TableColumns';
import { citiesRows } from '../TableRows/TableRows';
import { useGlobalContext } from '../hooks/GlobalContext';

interface ICitiesPageProps {
  pageName: string;
  link: string;
}

const CitiesPage: React.FC<ICitiesPageProps> = ({ pageName, link }) => {
  const { darkTheme } = useGlobalContext();
  const { classes, cx } = useNavBarStyles();

  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link,
          pageName,
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        {pageName}
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={citiesColumns}
        rows={citiesRows}
        noCheckAll
        noCopy
        noSearchField
      />
    </>
  );
};

export default CitiesPage;
