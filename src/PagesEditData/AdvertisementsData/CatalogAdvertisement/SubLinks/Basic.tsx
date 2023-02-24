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
import { usePagesDataCommonStyles } from '../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../components/Inputs/StyledField';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: any;
    published: boolean;
    discount: string;
    url: string;
  };
}

export const Basic: React.FC<IBasicProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

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
        htmlFor="discount"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        Знижка
        <StyledField
          id="discount"
          variant="outlined"
          sx={{ width: '280px', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.discount}
          onChange={handleFieldsChange}
        />
      </InputLabel>
      <InputLabel
        htmlFor="url"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
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
