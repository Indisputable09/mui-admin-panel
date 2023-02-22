import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { languagesRows } from '../TableRows/TableRows';
import { languagesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

interface ILanguagesPageProps {
  link: string;
  pageName: string;
  parentPageName: string;
}

const LanguagesPage: React.FC<ILanguagesPageProps> = ({
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
        columns={languagesColumns}
        rows={languagesRows}
        noCheckAll
        noCopy
        noSearchField
      />
    </>
  );
};

export default LanguagesPage;
