import React from 'react';
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
import dayjs, { Dayjs } from 'dayjs';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import DatePicker from '../../../components/Inputs/DatePicker';
import { useParams } from 'react-router-dom';
import { fetchAnalyses } from '../../../services/analysesPackagesAPI';
import MultipleAutocomplete from '../../../components/Inputs/MultipleAutocomplete';
import StyledField from '../../../components/Inputs/StyledField';

interface IGalleryProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: any;
    analyses: number[] | null;
    finishDate: Date | Dayjs | null | string;
    published: boolean;
    url: string;
  };
}

export const Data: React.FC<IGalleryProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { id } = useParams();
  const [analysesList, setAnalysesList] = React.useState([]);

  React.useEffect(() => {
    const getActionsList = async () => {
      const list = await fetchAnalyses();
      setAnalysesList(list);
    };
    getActionsList();
  }, [id]);

  const handleEndDateChange = (
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
    const array = analysesList.filter((item: any) =>
      fieldsValues.analyses?.includes(item.id)
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
              width: '400px',
              height: '150px',
              marginRight: '30px',
              border: '1px solid grey',
            }}
          >
            {fieldsValues.image ? (
              <>
                <img
                  src={fieldsValues.image}
                  alt={'test'}
                  width="100%"
                  height="100%"
                />
              </>
            ) : (
              <IconButton onClick={() => console.log('Add img')}>
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
                onClick={() => console.log('Edit img')}
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
                  setFieldsValues((prevState: any) => {
                    return { ...prevState, image: null };
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
      <InputLabel
        htmlFor="analyses"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Аналізи
        <MultipleAutocomplete
          list={analysesList}
          darkTheme={darkTheme}
          id="analyses"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('analyses')}
          value={autocompleteValue}
        />
      </InputLabel>
      <DatePicker
        noMaxDate
        darkTheme={darkTheme}
        label="Дата закінчення"
        value={fieldsValues.finishDate}
        onChange={(newValue: Date | Dayjs | null) => {
          handleEndDateChange('finishDate', newValue);
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
    </>
  );
};
