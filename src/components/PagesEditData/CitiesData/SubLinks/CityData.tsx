import React from 'react';
import {
  Button,
  Divider,
  InputLabel,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';

interface ICityDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    phoneNumbers: { id: string; value: string }[];
    address: string;
    email: string;
    mapLink: string;
    workingHours: string;
  };
  languages: { name: string; id: number; code: string }[];
}

export const CityData: React.FC<ICityDataProps> = ({
  languages,
  setFieldsValues,
  fieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const [languageCode, setLanguageCode] = React.useState<string>(
    languages[0].code
  );

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        phoneNumbers: [
          ...prevState.phoneNumbers,
          {
            id: nanoid(3),
            value: '',
          },
        ],
      };
    });
  };

  const handleFieldsChange =
    (index?: number, key?: string) => (e: React.ChangeEvent) => {
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
          return {
            ...prevState,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        }
      });
    };
  return (
    <>
      <List className={classes.languagesList}>
        {languages.map(language => {
          return (
            <ListItem
              key={language.id}
              className={classes.languagesListItem}
              onClick={() => handleLanguageClick(language.code)}
            >
              <Typography
                className={cx(
                  classes.languagesListText,
                  languageCode === language.code ? 'active' : null,
                  darkTheme ? 'dark' : null
                )}
                component="p"
              >
                {language.name.toLocaleUpperCase()}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      <InputLabel
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Номер Телефону
      </InputLabel>
      {fieldsValues.phoneNumbers.map((phoneNumber, index) => {
        return (
          <StyledField
            key={phoneNumber.id}
            id={phoneNumber.id}
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            onChange={handleFieldsChange(index, 'phoneNumbers')}
            value={phoneNumber.value}
            darkTheme={darkTheme}
          />
        );
      })}
      <Button
        onClick={handleAddClick}
        variant="contained"
        className={cx(classes.addButton, darkTheme ? 'dark' : null)}
      >
        <AddIcon /> Додати
      </Button>
      <Divider
        className={cx(
          classes.pricesBottomDivider,
          darkTheme ? 'dark' : null,
          'topMargin'
        )}
      />
      <InputLabel
        htmlFor="address"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Адреса
        <StyledField
          id="address"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.address}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
      <InputLabel
        htmlFor="email"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        E-mail
        <StyledField
          id="email"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.email}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
      <InputLabel
        htmlFor="mapLink"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Посилання на мапу
        <StyledField
          id="mapLink"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.mapLink}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
      <InputLabel
        htmlFor="workingHours"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Часи праці
        <StyledField
          id="workingHours"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.workingHours}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
    </>
  );
};
