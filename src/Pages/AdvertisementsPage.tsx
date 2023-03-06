import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { advertisementsRows } from '../TableRows/TableRows';
import { advertisementsColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { Status } from '../constants';
import { fetchAdvertisements } from '../services/advertisementsAPI';
import Loader from '../components/Loader';

interface IAdvertisementsPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const AdvertisementsPage: React.FC<IAdvertisementsPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme, rerenderComponent } = useGlobalContext();

  const [status, setStatus] = React.useState(idle);
  // const [advertisementsRows, setAdvertisementsRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        await fetchAdvertisements();
        // const arrayWithIds = list.map((item: any, index: number) => [
        //   { ...item, id: index },
        // ]);
        // setAdvertisementsRows(arrayWithIds.flat());
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
            columns={advertisementsColumns}
            rows={advertisementsRows}
            noAddButton
            noCheckboxSelection
          />
        </>
      )}
    </>
  );
};

export default AdvertisementsPage;
