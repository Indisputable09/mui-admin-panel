import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { usersColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import Loader from '../components/Loader';
import { fetchUsersList } from '../services/usersAPI';

interface IUsersPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const UsersPage: React.FC<IUsersPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme, rerenderComponent } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [usersRows, setUsersRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchUsersList();
        setUsersRows(list);
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
            columns={usersColumns}
            rows={usersRows}
          />
        </>
      )}
    </>
  );
};

export default UsersPage;
