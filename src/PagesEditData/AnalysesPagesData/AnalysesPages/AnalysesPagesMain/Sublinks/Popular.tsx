import React from 'react';
import { InputLabel } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../../../components/Inputs/MultipleAutocomplete';

interface IPopularProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    analyses: number[] | null;
    complexes: number[] | null;
    sales: number[] | null;
    news: number[] | null;
  };
  analyses: { id: number; value: string }[];
  complexes: { id: number; value: string }[];
  sales: { id: number; value: string }[];
  news: { id: number; value: string }[];
}

export const Popular: React.FC<IPopularProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
  analyses,
  complexes,
  sales,
  news,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleAutocompleteChange =
    (key: string) => (e: any, values: { id: number; value: string }[]) => {
      const chosenIds = values.map(item => item.id);
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: chosenIds,
        };
      });
    };

  const getAutocompleteValue = (
    list: { id: number; value: string }[],
    key: string
  ) => {
    if (list) {
      const array = list.filter(item => fieldsValues[key]?.includes(item.id));
      return array.map((obj: { id: number; value: string }) => obj.value);
    }
  };

  return (
    <>
      <InputLabel
        htmlFor="analyses"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Популярні аналізи
        <MultipleAutocomplete
          list={analyses}
          darkTheme={darkTheme}
          id="analyses"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('analyses')}
          value={getAutocompleteValue(analyses, 'analyses') || null}
        />
      </InputLabel>
      <InputLabel
        htmlFor="complexes"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Популярні пакети аналізів
        <MultipleAutocomplete
          list={complexes}
          darkTheme={darkTheme}
          id="complexes"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('complexes')}
          value={getAutocompleteValue(complexes, 'complexes') || null}
        />
      </InputLabel>
      <InputLabel
        htmlFor="sales"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Акції
        <MultipleAutocomplete
          list={sales}
          darkTheme={darkTheme}
          id="sales"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('sales')}
          value={getAutocompleteValue(sales, 'sales') || null}
        />
      </InputLabel>
      <InputLabel
        htmlFor="news"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Новини
        <MultipleAutocomplete
          list={news}
          darkTheme={darkTheme}
          id="news"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('news')}
          value={getAutocompleteValue(news, 'news') || null}
        />
      </InputLabel>
    </>
  );
};
