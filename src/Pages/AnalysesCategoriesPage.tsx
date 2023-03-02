import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
// import { analysesCategoriesRows } from '../TableRows/TableRows';
import { analysesCategoriesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import { fetchAnalysesCategoriesList } from '../services/analysesCategoriesAPI';
import Loader from '../components/Loader';

interface IAnalysesCategoriesPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const AnalysesCategoriesPage: React.FC<IAnalysesCategoriesPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme, rerenderComponent } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [analysesCategoriesRows, setAnalysesCategoriesRows] =
    React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchAnalysesCategoriesList();
        setAnalysesCategoriesRows(list);
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
            columns={analysesCategoriesColumns}
            rows={analysesCategoriesRows}
          />
        </>
      )}
    </>
  );
};

export default AnalysesCategoriesPage;
