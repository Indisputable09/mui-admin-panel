import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { vacanciesRows } from '../TableRows/TableRows';
import { vacanciesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

interface IVacanciesPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const VacanciesPage: React.FC<IVacanciesPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();
  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link,
          pageName,
          parentPageName,
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
        columns={vacanciesColumns}
        rows={vacanciesRows}
        noCheckAll
        noCopy
      />
    </>
  );
};

export default VacanciesPage;