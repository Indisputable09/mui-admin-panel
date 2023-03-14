import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { getAltText } from '../../../../../constants';
import { useFileManager } from '../../../../../hooks/useFileManager';

interface IBannerProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banner: {
      additionalColor: string;
      primaryColor: string;
      primaryText: { code: string; value: string }[];
      additionalText: { code: string; value: string }[];
      image: null | string;
      imageMobile: null | string;
      imageDesktop: null | string;
    };
    aboutImage: string | null;
  };
}

export const Banner: React.FC<IBannerProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { openFileManager } = useFileManager(handleImageChange);
  const { classes, cx } = usePagesDataCommonStyles();

  function handleImageChange(file: string | null) {
    return function (key?: string, index?: number, mainKey?: string) {
      setFieldsValues((prevState: typeof fieldsValues) => {
        if (key && mainKey) {
          return {
            ...prevState,
            [mainKey]: {
              ...prevState[mainKey],
              [key]: file,
            },
          };
        } else if (key) {
          return {
            ...prevState,
            [key]: file,
          };
        }
      });
    };
  }

  const handleDeleteImage = (key: string, index?: number, mainKey?: string) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      if (mainKey) {
        return {
          ...prevState,
          [mainKey]: {
            ...prevState[mainKey],
            [key]: null,
          },
        };
      } else {
        return {
          ...prevState,
          [key]: null,
        };
      }
    });
  };

  return (
    <Box className={cx(classes.bannerImagesBlock, 'marginBottom')}>
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
            {fieldsValues.banner.image ? (
              <>
                <img
                  src={fieldsValues.banner.image}
                  alt={getAltText(fieldsValues.banner.image)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton
                onClick={() => openFileManager('image', undefined, 'banner')}
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
          {fieldsValues.banner.image ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="edit"
                onClick={() => openFileManager('image', undefined, 'banner')}
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
                onClick={() => handleDeleteImage('image', undefined, 'banner')}
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
                onClick={() =>
                  handleDeleteImage('imageMobile', undefined, 'banner')
                }
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
                onClick={() =>
                  handleDeleteImage('imageDesktop', undefined, 'banner')
                }
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
            Зображення блоку з описом
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
            {fieldsValues.aboutImage ? (
              <>
                <img
                  src={fieldsValues.aboutImage}
                  alt={getAltText(fieldsValues.aboutImage)}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </>
            ) : (
              <IconButton onClick={() => openFileManager('aboutImage')}>
                <AddIcon
                  className={cx(
                    classes.addImageIcon,
                    darkTheme ? 'dark' : null
                  )}
                />
              </IconButton>
            )}
          </Box>
          {fieldsValues.aboutImage ? (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton
                className={cx(classes.newsImgBlockButton)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="edit"
                onClick={() => openFileManager('aboutImage')}
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
                onClick={() => handleDeleteImage('aboutImage')}
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
