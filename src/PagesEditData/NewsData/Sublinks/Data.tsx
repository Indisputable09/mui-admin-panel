import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  FormControlLabel,
  IconButton,
  InputLabel,
  Switch,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StyledField from '../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import DatePicker from '../../../components/Inputs/DatePicker';
import MultipleAutocomplete from '../../../components/Inputs/MultipleAutocomplete';
import { fetchNews } from '../../../services/newsAPI';
import { useParams } from 'react-router-dom';
import { useFileManager } from '../../../hooks/useFileManager';
import { getAltText } from '../../../constants';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: string | null;
    published: boolean;
    publicationDate: Date | Dayjs | null | string;
    url: string;
    recommendedNews: number[] | null;
  };
}

export const Data: React.FC<IDataProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { id } = useParams();
  const { openFileManager } = useFileManager(handleImageChange);
  const [recommendedNewsList, setRecommendedNewsList] = React.useState([]);

  React.useEffect(() => {
    const getRecommendedNews = async () => {
      const list = await fetchNews(id);
      setRecommendedNewsList(list);
    };
    getRecommendedNews();
  }, [id]);

  function handleImageChange(file: string | null) {
    return function () {
      setFieldsValues((prevState: typeof fieldsValues) => {
        return {
          ...prevState,
          image: file,
        };
      });
    };
  }

  const handleCreationDateChange = (
    name: string,
    newValue?: Date | Dayjs | null
  ) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [name]: dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ[Z]').slice(0, 10),
      };
    });
  };

  const handleActiveChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: (e.target as HTMLInputElement).checked,
        };
      });
    };

  const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const array = recommendedNewsList.filter((item: any) =>
      fieldsValues.recommendedNews?.includes(item.id)
    );
    return array.map((obj: { id: number; value: string }) => obj.value);
  };

  const autocompleteValue = getAutocompleteValue();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography component="h2" className={classes.descriptionText}>
            Зображення
          </Typography>
        </Box>
        <Box className={cx(classes.newsImgBlock)}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '200px',
              height: '150px',
              marginRight: '30px',
              border: '1px solid grey',
            }}
          >
            {fieldsValues.image ? (
              <>
                <img
                  src={fieldsValues.image}
                  alt={getAltText(fieldsValues.image)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton onClick={() => openFileManager()}>
                <AddIcon
                  className={cx(
                    classes.addImageIcon,
                    darkTheme ? 'dark' : null
                  )}
                />
              </IconButton>
            )}
          </Box>
          {fieldsValues.image ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="edit"
                onClick={() => openFileManager()}
              >
                <EditIcon
                  className={cx(classes.editIcon, darkTheme ? 'dark' : null)}
                />
              </IconButton>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="delete"
                onClick={() => {
                  return setFieldsValues((prevState: any) => {
                    return {
                      ...prevState,
                      image: null,
                    };
                  });
                }}
              >
                <DeleteIcon
                  className={cx(classes.deleteIcon, darkTheme ? 'dark' : null)}
                />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      </Box>
      <InputLabel
        htmlFor="url"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        URL
        <StyledField
          required
          id="url"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.url}
          onChange={handleFieldsChange}
        />
      </InputLabel>
      <DatePicker
        noMaxDate
        label="Дата публікації"
        darkTheme={darkTheme}
        value={fieldsValues.publicationDate}
        onChange={(newValue: Date | Dayjs | null) => {
          handleCreationDateChange('publicationDate', newValue);
        }}
      />
      <FormControlLabel
        className={cx(classes.formControlLabel, darkTheme ? 'dark' : null)}
        label="Опубліковано"
        control={
          <Switch
            checked={fieldsValues.published}
            onChange={handleActiveChange('published')}
            inputProps={{ 'aria-label': 'published' }}
            className={cx(classes.switch, darkTheme ? 'dark' : null)}
          />
        }
      />
      <InputLabel
        htmlFor="recommendedNews"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Рекомендовані новини
        <MultipleAutocomplete
          list={recommendedNewsList}
          darkTheme={darkTheme}
          id="recommendedNews"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('recommendedNews')}
          value={autocompleteValue}
        />
      </InputLabel>
    </>
  );
};
