import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { newsColumns } from '../TableColumns/TableColumns';
import { useGlobalContext } from '../hooks/GlobalContext';
import { fetchNewsList } from '../services/newsAPI';
import { Status } from '../constants';
import Loader from '../components/Loader';

interface INewsPageProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const NewsPage: React.FC<INewsPageProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { classes, cx } = useNavBarStyles();
  const { darkTheme } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [newsRows, setNewsRows] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const list = await fetchNewsList();
        setNewsRows(list);
        setStatus(resolved);
      } catch (error) {
        setStatus(rejected);
      }
    };
    fetchData();
  }, [pending, rejected, resolved]);

  let today = new Date()
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('-');
  console.log('today:', today);

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
            columns={newsColumns}
            rows={newsRows}
          />
        </>
      )}
    </>
  );
};

export default NewsPage;
