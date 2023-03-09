import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { analysesPagesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import { fetchPagesList } from '../services/pagesAPI';
import Loader from '../components/Loader';

interface IAnalysesPagesPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const AnalysesPagesPage: React.FC<IAnalysesPagesPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme, rerenderComponent } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [analysesPagesRows, setAnalysesPagesRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchPagesList();
        setAnalysesPagesRows(list);
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
            columns={analysesPagesColumns}
            rows={analysesPagesRows}
            noAddButton
            noCheckboxSelection
          />
        </>
      )}
    </>
  );
};

export default AnalysesPagesPage;
