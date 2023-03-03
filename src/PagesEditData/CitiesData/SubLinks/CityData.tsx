import React from 'react';
import { Box, Button, Divider, IconButton, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface ICityDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    phoneNumbers: string[];
    email: string;
    mapLink: string;
    url: string;
  };
}

export const CityData: React.FC<ICityDataProps> = ({
  setFieldsValues,
  fieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        phoneNumbers: [...prevState.phoneNumbers, ''],
      };
    });
  };

  const handleFieldsChange =
    (index?: number, key?: string) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        if (key) {
          if (key === 'phoneNumbers') {
            const newArray = fieldsValues[key].map((item: any, i: any) => {
              if (index === i) {
                item = (e.target as HTMLInputElement).value;
                return item;
              } else return item;
            });
            return {
              ...prevState,
              [key]: [...newArray],
            };
          } else {
            const newArray = fieldsValues[key].map((item: any, i: any) => {
              if (index === i) {
                return { ...item, value: (e.target as HTMLInputElement).value };
              } else return item;
            });
            return {
              ...prevState,
              [key]: [...newArray],
            };
          }
        } else {
          return {
            ...prevState,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        }
      });
    };

  const handleDeletePhoneNumberClick = (id: number) => {
    const filteredData = fieldsValues.phoneNumbers.filter((number, index) => {
      return index !== id;
    });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        phoneNumbers: filteredData,
      };
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
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <StyledField
              id={phoneNumber}
              type="tel"
              variant="outlined"
              sx={{ width: '100%', mt: '16px' }}
              onChange={handleFieldsChange(index, 'phoneNumbers')}
              value={phoneNumber ? phoneNumber : ''}
              darkTheme={darkTheme}
            />
            <IconButton
              className={cx(classes.deleteBanner, darkTheme ? 'dark' : null)}
              onClick={() => handleDeletePhoneNumberClick(index)}
            >
              <DeleteIcon sx={{ width: '28px', height: '28px' }} />
            </IconButton>
          </Box>
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
