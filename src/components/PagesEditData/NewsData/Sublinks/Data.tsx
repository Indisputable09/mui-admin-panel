import React from 'react';
import { Dayjs } from 'dayjs';
import {
  Box,
  FormControlLabel,
  IconButton,
  InputLabel,
  Switch,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StyledField from '../../../Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import DatePicker from '../../../Inputs/DatePicker';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: any;
    active: boolean;
    creationDate: Date | Dayjs | null;
    url: string;
  };
}

export const Data: React.FC<IDataProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleCreationDateChange = (
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

  const handleFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <>
      <Box className={cx(classes.newsImgBlock)}>
        <IconButton
          className={cx(classes.newsImgBlockButton)}
          disabled={fieldsValues.image ? true : false}
        >
          <AddPhotoAlternateIcon
            className={cx(classes.addImgIcon, darkTheme ? 'dark' : null)}
          />
        </IconButton>
        <Box
          sx={{
            width: '200px',
            height: '150px',
            marginLeft: '30px',
            marginRight: '30px',
            border: '1px solid grey',
          }}
        ></Box>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <IconButton
            className={cx(classes.newsImgBlockButton)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="edit"
            disabled={fieldsValues.image ? false : true}
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
            disabled={fieldsValues.image ? false : true}
          >
            <DeleteIcon
              className={cx(classes.deleteIcon, darkTheme ? 'dark' : null)}
            />
          </IconButton>
        </Box>
      </Box>
      <FormControlLabel
        className={cx(classes.formControlLabel, darkTheme ? 'dark' : null)}
        label="Активна"
        control={
          <Switch
            checked={fieldsValues.active}
            onChange={handleActiveChange('active')}
            inputProps={{ 'aria-label': 'active' }}
            className={cx(classes.switch, darkTheme ? 'dark' : null)}
          />
        }
      />
      <DatePicker
        darkTheme={darkTheme}
        value={fieldsValues.creationDate}
        onChange={(newValue: Date | Dayjs | null) => {
          handleCreationDateChange('creationDate', newValue);
        }}
      />
      <InputLabel
        htmlFor="url"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        URL
        <StyledField
          id="url"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.url}
          onChange={handleFieldsChange}
        />
      </InputLabel>
    </>
  );
};
