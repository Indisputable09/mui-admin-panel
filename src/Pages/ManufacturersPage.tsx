import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { manufacturersColumns } from '../TableColumns/TableColumns';
import { manufacturersRows } from '../TableRows/TableRows';
import { useGlobalContext } from '../hooks/GlobalContext';

interface IManufacturersPageProps {
  link: string;
  pageName: string;
  parentPageName: string;
}

const ManufacturersPage: React.FC<IManufacturersPageProps> = ({
  link,
  pageName,
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
        columns={manufacturersColumns}
        rows={manufacturersRows}
        noCheckAll
        noCopy
      />
    </>
  );
};

export default ManufacturersPage;
