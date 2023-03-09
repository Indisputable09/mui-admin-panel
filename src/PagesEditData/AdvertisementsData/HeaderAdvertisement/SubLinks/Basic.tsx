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
import { useFileManager } from '../../../../hooks/useFileManager';
import { getAltText } from '../../../../constants';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: string | null;
    published: boolean;
    discount: string | null;
  };
}

export const Basic: React.FC<IBasicProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { openFileManager } = useFileManager(handleImageChange);

  function handleImageChange(file: string | null) {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        image: file,
      };
    });
  }

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
            {fieldsValues.image ? (
              <>
                <img
                  src={fieldsValues.image}
                  alt={getAltText(fieldsValues.image)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton onClick={openFileManager}>
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
                onClick={openFileManager}
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
        htmlFor="discount"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'topMargin',
          'noBottomMargin'
        )}
      >
        Знижка
        <StyledField
          id="discount"
          variant="outlined"
          sx={{ width: '280px', mt: '16px' }}
          darkTheme={darkTheme}
          value={fieldsValues.discount ? fieldsValues.discount : ''}
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
