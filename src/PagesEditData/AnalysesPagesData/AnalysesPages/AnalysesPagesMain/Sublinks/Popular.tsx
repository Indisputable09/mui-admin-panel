import React from 'react';
// import { InputLabel } from '@mui/material';
// import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
// import MultipleAutocomplete from '../../../../../components/Inputs/MultipleAutocomplete';

interface IPopularProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    popularAnalyses: string[];
    popularAnalysesPackages: string[];
    actions: string[];
    news: string[];
  };
}

export const Popular: React.FC<IPopularProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  // const { classes, cx } = usePagesDataCommonStyles();

  // const handleAutocompleteChange =
  //   (key: string) => (e: any, values: string[]) => {
  //     setFieldsValues((prevState: any) => {
  //       return {
  //         ...prevState,
  //         [key]: values,
  //       };
  //     });
  //   };

  return (
    <>
      {/* <InputLabel
        htmlFor="popularAnalyses"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Популярні аналізи
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="popularAnalyses"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('popularAnalyses')}
          value={fieldsValues.popularAnalyses}
        />
      </InputLabel> */}
      {/* <InputLabel
        htmlFor="popularAnalysesPackages"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Популярні пакети аналізів
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="popularAnalysesPackages"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('popularAnalysesPackages')}
          value={fieldsValues.popularAnalysesPackages}
        />
      </InputLabel> */}
      {/* <InputLabel
        htmlFor="actions"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Акції
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="actions"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('actions')}
          value={fieldsValues.actions}
        />
      </InputLabel> */}
      {/* <InputLabel
        htmlFor="news"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Новини
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="news"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('news')}
          value={fieldsValues.news}
        />
      </InputLabel> */}
    </>
  );
};
