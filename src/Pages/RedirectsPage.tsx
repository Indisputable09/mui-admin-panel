import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { redirectsRows } from '../TableRows/TableRows';
import { redirectsColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

interface IRedirectsPageProps {
  link: string;
  pageName: string;
  parentPageName: string;
}

const RedirectsPage: React.FC<IRedirectsPageProps> = ({
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
        columns={redirectsColumns}
        rows={redirectsRows}
      />
    </>
  );
};

export default RedirectsPage;
