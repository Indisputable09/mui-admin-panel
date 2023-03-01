import React from 'react';
import {
  Box,
  IconButton,
  // InputLabel,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
// import MultipleAutocomplete from '../../../../../components/Inputs/MultipleAutocomplete';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    image: string;
    mobileImage: string;
    analyses: string[];
  };
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  return (
    <>
      <Box className={cx(classes.bannerImagesBlock)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography component="h2" className={classes.descriptionText}>
              Зображення у банері
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
                    className={cx(
                      classes.deleteIcon,
                      darkTheme ? 'dark' : null
                    )}
                  />
                </IconButton>
              </Box>
            ) : null}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography component="h2" className={classes.descriptionText}>
              Зображення у банері (моб)
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
              {fieldsValues.mobileImage ? null : (
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
            {fieldsValues.mobileImage ? (
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
                    className={cx(
                      classes.deleteIcon,
                      darkTheme ? 'dark' : null
                    )}
                  />
                </IconButton>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      {/* <InputLabel
        htmlFor="category"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        Аналізи
        <MultipleAutocomplete
          list={analyses}
          darkTheme={darkTheme}
          id="category"
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          onChange={(e: any, values: string[]) => {
            setFieldsValues((prevState: any) => {
              return {
                ...prevState,
                analyses: values,
              };
            });
          }}
          value={fieldsValues.analyses}
        />
      </InputLabel> */}
    </>
  );
};
