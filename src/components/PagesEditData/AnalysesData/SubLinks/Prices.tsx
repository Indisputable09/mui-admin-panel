import React from 'react';
import { Button, Divider, InputLabel, Paper, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '../../../Inputs/Autocomplete';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../Inputs/StyledField';
import { stopInputScroll } from '../../../../constants';

const cities = ['Київ', 'Харків', 'Вишгород'];

export const CustomPaper: React.FC = props => {
  return <Paper {...props} />;
};

interface IPricesProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    prices: {
      id: string;
      city: string | null;
      price: number;
      priceWithDiscount: number;
    }[];
  };
}

export const Prices: React.FC<IPricesProps> = ({
  darkTheme,
  fieldsValues,
  setFieldsValues,
}) => {
  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        prices: [
          ...prevState.prices,
          {
            id: nanoid(3),
            city: null,
            price: 0,
            priceWithDiscount: 0,
          },
        ],
      };
    });
  };

  const handleFieldsChange =
    (index: number, key?: string) => (e: any, newValue?: string | null) => {
      const newArray = fieldsValues.prices.map((item, i) => {
        if (index === i) {
          if (key) {
            return {
              ...item,
              [key]: newValue,
            };
          } else {
            return {
              ...item,
              [e.target.id]: Number((e.target as HTMLInputElement).value),
            };
          }
        } else {
          return item;
        }
      });
      setFieldsValues((prevState: typeof fieldsValues) => {
        return {
          ...prevState,
          prices: [...newArray],
        };
      });
    };

  // const handleDeleteClick = (id: string) => {
  //   const filteredAttributes = fieldsValues.prices.filter(
  //     item => item.id !== id
  //   );
  //   setFieldsValues((prevState: typeof fieldsValues) => {
  //     return {
  //       ...prevState,
  //       attributes: filteredAttributes,
  //     };
  //   });
  // };

  const remainingCities = cities.filter(city => {
    const chosenObj = fieldsValues.prices.find(price => {
      return price.city === city;
    });
    if (chosenObj) {
      return chosenObj.city !== city;
    } else {
      return city;
    }
  });

  const { classes, cx } = usePagesDataCommonStyles();

  return (
    <>
      {fieldsValues.prices.length === 0 ? (
        <Typography component="h2" className={classes.noResultsText}>
          Ціни відсутні
        </Typography>
      ) : (
        <>
          {fieldsValues.prices.map((item, index) => {
            return (
              <React.Fragment key={item.id}>
                <InputLabel
                  htmlFor="city"
                  className={cx(classes.label, darkTheme ? 'dark' : null)}
                >
                  Місто
                  <Autocomplete
                    id="producer"
                    onChange={handleFieldsChange(index, 'city')}
                    value={item.city}
                    list={remainingCities}
                    className={cx(
                      classes.autocomplete,
                      darkTheme ? 'dark' : null
                    )}
                  />
                </InputLabel>
                <InputLabel
                  htmlFor="price"
                  className={cx(classes.label, darkTheme ? 'dark' : null)}
                >
                  Ціна
                  <StyledField
                    type="number"
                    onWheel={e => {
                      stopInputScroll(e);
                    }}
                    id="price"
                    variant="outlined"
                    sx={{ width: '100%', mt: '16px' }}
                    onChange={handleFieldsChange(index)}
                    value={Number(item.price).toString()}
                    darkTheme={darkTheme}
                  />
                </InputLabel>
                <InputLabel
                  htmlFor="priceWithDiscount"
                  className={cx(classes.label, darkTheme ? 'dark' : null)}
                >
                  Ціна зі знижкою
                  <StyledField
                    type="number"
                    onWheel={e => {
                      stopInputScroll(e);
                    }}
                    id="priceWithDiscount"
                    variant="outlined"
                    sx={{ width: '100%', mt: '16px' }}
                    onChange={handleFieldsChange(index)}
                    value={Number(item.priceWithDiscount).toString()}
                    darkTheme={darkTheme}
                  />
                </InputLabel>
                <Divider
                  className={cx(
                    classes.pricesBottomDivider,
                    darkTheme ? 'dark' : null
                  )}
                />
              </React.Fragment>
            );
          })}
        </>
      )}
      <Button
        onClick={handleAddClick}
        variant="contained"
        className={cx(classes.addButton, darkTheme ? 'dark' : null)}
      >
        <AddIcon /> Додати
      </Button>
    </>
  );
};

/*
<IconButton
                        className={cx(
                          classes.deleteAttributeButton,
                          darkTheme ? 'dark' : null
                        )}
                        onClick={() => handleDeleteClick(item.id)}
                        name={item.id}
                      >
                        <Delete sx={{ width: '28px', height: '28px' }} />
                      </IconButton> */
