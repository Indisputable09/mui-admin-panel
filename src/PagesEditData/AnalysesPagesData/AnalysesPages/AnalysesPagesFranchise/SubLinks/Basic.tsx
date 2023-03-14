import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { useFileManager } from '../../../../../hooks/useFileManager';
import { getAltText } from '../../../../../constants';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banner: {
      additionalColor: string;
      primaryColor: string;
      primaryText: { code: string; value: string }[];
      additionalText: { code: string; value: string }[];
      imageMobile: null | string;
      imageDesktop: null | string;
    };
  };
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { openFileManager } = useFileManager(handleImageChange);

  function handleImageChange(file: string | null) {
    return function (key?: string, index?: number) {
      setFieldsValues((prevState: typeof fieldsValues) => {
        if (key) {
          return {
            ...prevState,
            banner: {
              ...prevState.banner,
              [key]: file,
            },
          };
        } else {
          return {
            ...prevState,
          };
        }
      });
    };
  }

  const handleDeleteImage = (key: string, index?: number) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banner: {
          ...prevState.banner,
          [key]: null,
        },
      };
    });
  };

  return (
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
            Фон для мобільної версії
          </Typography>
        </Box>
        <Box className={cx(classes.newsImgBlock, 'grid')}>
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
            {fieldsValues.banner.imageMobile ? (
              <>
                <img
                  src={fieldsValues.banner.imageMobile}
                  alt={getAltText(fieldsValues.banner.imageMobile)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton
                onClick={() =>
                  openFileManager('imageMobile', undefined, 'banner')
                }
              >
                <AddIcon
                  className={cx(
                    classes.addImageIcon,
                    darkTheme ? 'dark' : null
                  )}
                />
              </IconButton>
            )}
          </Box>
          {fieldsValues.banner.imageMobile ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="edit"
                onClick={() =>
                  openFileManager('imageMobile', undefined, 'banner')
                }
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
                onClick={() => handleDeleteImage('imageMobile')}
              >
                <DeleteIcon
                  className={cx(classes.deleteIcon, darkTheme ? 'dark' : null)}
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
          marginTop: '16px',
        }}
      >
        <Box>
          <Typography component="h2" className={classes.descriptionText}>
            Фон для десктопу
          </Typography>
        </Box>
        <Box className={cx(classes.newsImgBlock, 'grid')}>
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
            {fieldsValues.banner.imageDesktop ? (
              <>
                <img
                  src={fieldsValues.banner.imageDesktop}
                  alt={getAltText(fieldsValues.banner.imageDesktop)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton
                onClick={() =>
                  openFileManager('imageDesktop', undefined, 'banner')
                }
              >
                <AddIcon
                  className={cx(
                    classes.addImageIcon,
                    darkTheme ? 'dark' : null
                  )}
                />
              </IconButton>
            )}
          </Box>
          {fieldsValues.banner.imageDesktop ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="edit"
                onClick={() =>
                  openFileManager('imageDesktop', undefined, 'banner')
                }
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
                onClick={() => handleDeleteImage('imageDesktop')}
              >
                <DeleteIcon
                  className={cx(classes.deleteIcon, darkTheme ? 'dark' : null)}
                />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
