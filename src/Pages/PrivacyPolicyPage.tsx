import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { privacyPolicyRows } from '../TableRows/TableRows';
import { privacyPolicyColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';

const PrivacyPolicyPage: React.FC = () => {
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();

  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link: '/content/privacyPolicy',
          pageName: 'Політика конфіденційності',
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        Політика конфіденційності
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={privacyPolicyColumns}
        rows={privacyPolicyRows}
      />
    </>
  );
};

export default PrivacyPolicyPage;
