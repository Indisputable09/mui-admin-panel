import React from 'react';
import { Checkbox, FormControlLabel, InputLabel, Switch } from '@mui/material';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../components/Inputs/MultipleAutocomplete';
import { fetchCategories } from '../../../services/analysesAPI';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    category: number[] | null;
    url: string;
    code: string;
    published: boolean;
    makeAtHome: boolean;
  };
}

export const Data: React.FC<IDataProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const [categoriesList, setCategoriesList] = React.useState([]);

  React.useEffect(() => {
    const getCategories = async () => {
      const list = await fetchCategories();
      setCategoriesList(list);
    };
    getCategories();
  }, []);

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

  const getAutocompleteValue = () => {
    const array = categoriesList.filter((item: any) =>
      fieldsValues.category?.includes(item.id)
    );
    return array.map((obj: { id: number; value: string }) => obj.value);
  };

  const autocompleteValue = getAutocompleteValue();

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
          list={categoriesList}
          darkTheme={darkTheme}
          id="category"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('category')}
          value={autocompleteValue}
        />
      </InputLabel>
      <InputLabel
        htmlFor="url"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        URL
        <StyledField
          id="url"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.url}
          onChange={handleInputsChange}
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
