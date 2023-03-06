import React from 'react';
import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import { stopInputScroll } from '../../../constants';
import { LanguagesTabsList } from '../../PagesDataCommon/LanguagesTabsList';

interface IAnalysesCategoryBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    name: {
      code: string;
      value: string;
    }[];
    url: string;
    sort: number;
    top: boolean;
  };
  languages: { value: string; code: string }[];
}

export const AnalysesCategoryBasic: React.FC<IAnalysesCategoryBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
  languages,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const [languageCode, setLanguageCode] = React.useState<string>(
    languages[0].code
  );

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange =
    (key?: string, index?: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        if (key) {
          const newArray = fieldsValues[key].map((item: any, i: any) => {
            if (index === i) {
              return { ...item, value: (e.target as HTMLInputElement).value };
            } else return item;
          });
          return {
            ...prevState,
            [key]: [...newArray],
          };
        } else {
          if (e.target.type === 'number') {
            return {
              ...prevState,
              [e.target.id]: Number((e.target as HTMLInputElement).value),
            };
          } else {
            return {
              ...prevState,
              [e.target.id]: (e.target as HTMLInputElement).value,
            };
          }
        }
      });
    };

  const handleCheckboxChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: (e.target as HTMLInputElement).checked,
        };
      });
    };

  return (
    <>
      <LanguagesTabsList
        handleLanguageClick={handleLanguageClick}
        languageCode={languageCode}
        languages={languages}
      />
      {fieldsValues.name.map((name, index) => {
        return (
          <React.Fragment key={index}>
            {name.code === languageCode && (
              <InputLabel
                htmlFor="name"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                <div>
                  Назва категорії
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </div>
                <StyledField
                  id="name"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={name.value ? name.value : ''}
                  onChange={handleFieldsChange('name', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
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
          value={fieldsValues.url ? fieldsValues.url : ''}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
      <InputLabel
        htmlFor="sort"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Сортування
        <StyledField
          type="number"
          onWheel={e => {
            stopInputScroll(e);
          }}
          id="sort"
          variant="outlined"
          sx={{ width: '40%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={Number(fieldsValues.sort).toString()}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
      <FormControlLabel
        className={cx(classes.formControlCheckBox, darkTheme ? 'dark' : null)}
        control={
          <Checkbox
            className={cx(classes.checkbox, darkTheme ? 'dark' : null)}
            checked={fieldsValues.top}
            onChange={handleCheckboxChange('top')}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="В топі"
      />
    </>
  );
};
