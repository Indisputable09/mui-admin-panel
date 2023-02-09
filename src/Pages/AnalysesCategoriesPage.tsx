import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { analysesCategoriesRows } from '../TableRows/TableRows';
import { analysesCategoriesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

interface IAnalysesCategoriesPageProps {
  pageName: string;
  link: string;
}

const AnalysesCategoriesPage: React.FC<IAnalysesCategoriesPageProps> = ({
  pageName,
  link,
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
        columns={analysesCategoriesColumns}
        rows={analysesCategoriesRows}
      />
    </>
  );
};

export default AnalysesCategoriesPage;
