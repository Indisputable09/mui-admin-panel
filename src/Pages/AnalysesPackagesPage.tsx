import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { analysesPackagesRows } from '../TableRows/TableRows';
import { analysesPackagesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

interface IAnalysesPackagesPageProps {
  pageName: string;
  link: string;
}

const AnalysesPackagesPage: React.FC<IAnalysesPackagesPageProps> = ({
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
        columns={analysesPackagesColumns}
        rows={analysesPackagesRows}
      />
    </>
  );
};

export default AnalysesPackagesPage;
