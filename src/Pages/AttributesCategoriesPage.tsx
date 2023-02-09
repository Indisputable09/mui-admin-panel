import React from 'react';
import { Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../components/Crumbs/Crumbs';
import { useNavBarStyles } from '../components/NavBar/NavBar.styles';
import TableComponent from '../components/TableComponent';
import { attributesCategoriesRows } from '../TableRows/TableRows';
import { attributesCategoriesColumns } from '../TableColumns/TableColumns';

interface IAttributesCategoriesPageProps {
  darkTheme: boolean;
}

const AttributesCategoriesPage: React.FC<IAttributesCategoriesPageProps> = ({
  darkTheme,
}) => {
  const { classes, cx } = useNavBarStyles();

  return (
    <>
      <CollapsedBreadcrumbs
        darkTheme={darkTheme}
        linksData={{
          link: '/products/attributesCategories',
          pageName: 'Категорії атрибутів',
        }}
      />
      <Typography
        component="h2"
        className={cx(classes.title, darkTheme ? 'dark' : null)}
      >
        Категорії атрибутів
      </Typography>
      <TableComponent
        darkTheme={darkTheme}
        columns={attributesCategoriesColumns}
        rows={attributesCategoriesRows}
      />
    </>
  );
};

export default AttributesCategoriesPage;
