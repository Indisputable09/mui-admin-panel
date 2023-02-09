import React from 'react';
import { InputLabel } from '@mui/material';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../Inputs/MultipleAutocomplete';

interface IConnectionsFAQProps {
  darkTheme: boolean;
  FAQFieldsValues: {
    page: string[];
  };
  setFAQFieldsValues: (obj: any) => void;
}

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export const ConnectionsFAQ: React.FC<IConnectionsFAQProps> = ({
  darkTheme,
  FAQFieldsValues,
  setFAQFieldsValues,
}) => {
  const handleMultipleSelectChange =
    (name: string) => (e: any, newValue: string[]) => {
      setFAQFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [name]: newValue,
        };
      });
    };

  const { classes, cx } = usePagesDataCommonStyles();
  return (
    <>
      <InputLabel
        htmlFor="page"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Сторінка
        <MultipleAutocomplete
          list={names}
          darkTheme={darkTheme}
          id="page"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleMultipleSelectChange('page')}
          value={FAQFieldsValues.page}
        />
      </InputLabel>
    </>
  );
};
