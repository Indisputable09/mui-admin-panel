import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { citiesColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import { fetchCitiesList } from '../services/citiesAPI';
import Loader from '../components/Loader';

interface ICitiesPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const CitiesPage: React.FC<ICitiesPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { darkTheme, rerenderComponent } = useGlobalContext();
  const { classes, cx } = useNavBarStyles();
  const [status, setStatus] = React.useState(idle);
  const [citiesRows, setCitiesRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchCitiesList();
        setCitiesRows(list);
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
            columns={citiesColumns}
            rows={citiesRows}
            noCheckAll
            noCopy
            noSearchField
          />
        </>
      )}
    </>
  );
};

export default CitiesPage;
