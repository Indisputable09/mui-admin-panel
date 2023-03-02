import React from 'react';
import {
  Button,
  Divider,
  IconButton,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '../../../components/Inputs/Autocomplete';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../components/Inputs/StyledField';
import { stopInputScroll } from '../../../constants';

export const CustomPaper: React.FC = props => {
  return <Paper {...props} />;
};

interface IPricesProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    prices:
      | {
          city: number | null;
          price: number;
          priceWithDiscount: number | null;
        }[];
  };
  citiesList: { id: number; value: string }[];
}

export const Prices: React.FC<IPricesProps> = ({
  darkTheme,
  fieldsValues,
  setFieldsValues,
  citiesList,
}) => {
  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        prices: [
          ...prevState.prices,
          {
            city: null,
            price: 0,
            priceWithDiscount: null,
          },
        ],
      };
    });
  };

  const handleFieldsChange =
    (index: number, key?: string) => (e: any, newValue?: string | null) => {
      const newCityTOSend = citiesList.filter(
        (item: any) => item.value === newValue
      )[0];
      const cityId = newCityTOSend
        ? (newCityTOSend as { id: number; value: string }).id
        : null;
      const newArray = fieldsValues.prices.map((item, i) => {
        if (index === i) {
          if (key) {
            return {
              ...item,
              [key]: cityId,
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

  const remainingCities = citiesList.filter(city => {
    const chosenObj = fieldsValues.prices.find(price => {
      return price.city === city.id;
    });
    if (chosenObj) {
      return chosenObj.city !== city.id;
    } else {
      return city;
    }
  });

  const handleDeletePriceClick = (id: number) => {
    const filteredData = fieldsValues.prices.filter(
      (item: any, index: number) => index !== id
    );
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        prices: filteredData,
      };
    });
  };

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
              <React.Fragment key={index}>
                <InputLabel
                  htmlFor="city"
                  className={cx(classes.label, darkTheme ? 'dark' : null)}
                >
                  Місто
                  <Autocomplete
                    id="producer"
                    onChange={handleFieldsChange(index, 'city')}
                    value={citiesList
                      .filter((city: any) => city.id === item.city)
                      .map((value: any) => value.value)}
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
                  className={cx(
                    classes.label,
                    darkTheme ? 'dark' : null,
                    'noMarginBottom'
                  )}
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
                {fieldsValues.prices.length > 1 ? (
                  <IconButton
                    className={cx(
                      classes.deleteBanner,
                      darkTheme ? 'dark' : null
                    )}
                    onClick={() => handleDeletePriceClick(index)}
                  >
                    <DeleteIcon sx={{ width: '28px', height: '28px' }} />
                  </IconButton>
                ) : null}
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
