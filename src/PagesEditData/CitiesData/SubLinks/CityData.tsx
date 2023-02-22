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
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';

interface ICityDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    phoneNumbers: { id: string; value: string }[];
    email: string;
    mapLink: string;
    url: string;
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
            type="tel"
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
        htmlFor="email"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        E-mail
        <StyledField
          id="email"
          type="email"
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
          onChange={handleFieldsChange()}
        />
      </InputLabel>
    </>
  );
};
