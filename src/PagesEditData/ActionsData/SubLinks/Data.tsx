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
import { Dayjs } from 'dayjs';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import MultipleAutocomplete from '../../../components/Inputs/MultipleAutocomplete';
import DatePicker from '../../../components/Inputs/DatePicker';

interface IGalleryProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: string;
    analyses: string[];
    endDate: Date | Dayjs | null;
    published: boolean;
  };
}

const categories = ['category1', 'category2', 'category3', 'Mobile phone'];

export const Data: React.FC<IGalleryProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleEndDateChange = (
    name: string,
    newValue?: Date | Dayjs | null
  ) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [name]: newValue,
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

  const handleAutocompleteChange =
    (key: string) => (e: any, values: string[]) => {
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: values,
        };
      });
    };

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
            {fieldsValues.image ? null : (
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
                onClick={() => console.log('Delete img')}
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
        htmlFor="analyses"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        Аналізи
        <MultipleAutocomplete
          list={categories}
          darkTheme={darkTheme}
          id="analyses"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={handleAutocompleteChange('analyses')}
          value={fieldsValues.analyses}
        />
      </InputLabel>
      <DatePicker
        noMaxDate
        darkTheme={darkTheme}
        label="Дата закінчення"
        value={fieldsValues.endDate}
        onChange={(newValue: Date | Dayjs | null) => {
          handleEndDateChange('endDate', newValue);
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
