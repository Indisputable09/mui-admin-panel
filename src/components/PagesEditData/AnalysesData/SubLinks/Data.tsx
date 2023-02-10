import React from 'react';
import { Checkbox, FormControlLabel, InputLabel, Switch } from '@mui/material';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../Inputs/MultipleAutocomplete';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    category: string[];
    code: string;
    deadline: string;
    published: boolean;
    makeAtHome: boolean;
  };
}
const categories = ['category1', 'category2', 'category3', 'Mobile phone'];

export const Data: React.FC<IDataProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const handlePublishedChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: (e.target as HTMLInputElement).checked,
        };
      });
    };

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  const { classes, cx } = usePagesDataCommonStyles();

  return (
    <>
      <InputLabel
        htmlFor="category"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        <div>
          Категорія<span style={{ color: 'red', fontSize: '20px' }}>*</span>
        </div>
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="category"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={(e: any, values: string[]) => {
            setFieldsValues((prevState: any) => {
              return {
                ...prevState,
                category: values,
              };
            });
          }}
          value={fieldsValues.category}
        />
      </InputLabel>
      <InputLabel
        htmlFor="code"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Код
        <StyledField
          id="code"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.code}
          onChange={handleInputsChange}
        />
      </InputLabel>
      <InputLabel
        htmlFor="deadline"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Термін виконання
        <StyledField
          id="deadline"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          onChange={handleInputsChange}
          value={fieldsValues.deadline}
          darkTheme={darkTheme}
        />
      </InputLabel>
      <FormControlLabel
        className={cx(classes.formControlLabel, darkTheme ? 'dark' : null)}
        label="Опубліковано"
        control={
          <Switch
            checked={fieldsValues.published}
            onChange={handlePublishedChange('published')}
            inputProps={{ 'aria-label': 'published' }}
            className={cx(classes.switch, darkTheme ? 'dark' : null)}
          />
        }
      />
      <FormControlLabel
        className={cx(classes.formControlCheckBox, darkTheme ? 'dark' : null)}
        control={
          <Checkbox
            className={cx(classes.checkbox, darkTheme ? 'dark' : null)}
            checked={fieldsValues.makeAtHome}
            onChange={handlePublishedChange('makeAtHome')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Можна здати вдома"
      />
    </>
  );
};
