import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { analysesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import Loader from '../components/Loader';
import { fetchAnalysesList } from '../services/analysesAPI';

interface IAnalysesPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const AnalysesPage: React.FC<IAnalysesPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme, rerenderComponent } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [analysesRows, setAnalysesRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchAnalysesList();
        setAnalysesRows(list);
        setStatus(resolved);
      } catch (error) {
        setStatus(rejected);
      }
    };
    fetchData();
  }, [pending, rejected, resolved, rerenderComponent]);

  return (
    <>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
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
            columns={analysesColumns}
            rows={analysesRows}
          />
        </>
      )}
    </>
  );
};

export default AnalysesPage;
