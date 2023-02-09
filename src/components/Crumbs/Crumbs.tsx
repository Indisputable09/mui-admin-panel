import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from '@mui/material';
import { useCrumbsStyles } from './Crumbs.styles';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

interface ICrumbsProps {
  linksData: {
    link: string;
    name?: string | null;
    pageName: string;
  };
  darkTheme: boolean;
}

const CollapsedBreadcrumbs: React.FC<ICrumbsProps> = ({
  linksData,
  darkTheme,
}) => {
  const { classes, cx } = useCrumbsStyles();

  return (
    <Box
      role="presentation"
      onClick={handleClick}
      sx={{ mb: 3, color: '#fff' }}
    >
      <Breadcrumbs
        maxItems={3}
        aria-label="breadcrumb"
        separator={
          <ArrowForwardIcon
            fontSize="small"
            className={cx(classes.separator, darkTheme ? 'dark' : null)}
          />
        }
      >
        <Link
          to="/"
          className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
        >
          Дашборд
        </Link>
        {/* {path && !productData && (
          <Link
            to={'/products/' + path}
            className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
          >
            {path === 'productsCatalog' && 'Каталог товарів'}
            {path === 'productsCategories' && 'Категорії товарів'}
            {path === 'FAQ' && 'FAQ`s'}
            {path === 'languages' && 'Мови'}
            {path === 'cities' && 'Міста'}
            {path === 'manufacturers' && 'Виробники'}
          </Link>
        )} */}
        {/* {productData && (
          <> */}
        <Link
          to={linksData.link}
          className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
        >
          {linksData.pageName}
        </Link>
        {linksData.name && (
          <MuiLink
            underline="none"
            color="inherit"
            className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
          >
            {linksData.name}
          </MuiLink>
        )}
        {/* </>
        )} */}
        {/* <Link
          underline="hover"
          color="inherit"
          href="#"
          className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
        >
          Accessories
        </Link> */}
        {/* <Link
          underline="hover"
          color="inherit"
          href="#"
          className={cx(classes.mainLink, darkTheme ? 'dark' : null)}
        >
          New Collection
        </Link> */}
        {/* <Typography
          className={cx(classes.currentLink, darkTheme ? 'dark' : null)}
        >
          {productName ? productName : 'This page'}
        </Typography> */}
      </Breadcrumbs>
    </Box>
  );
};

export default CollapsedBreadcrumbs;
