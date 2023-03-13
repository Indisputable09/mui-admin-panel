import React from 'react';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';
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
      image: null | string;
      imageMobile: null | string;
      imageDesktop: null | string;
    };
    service: {
      image: string | null;
      title: { code: string; value: string }[];
      text: { code: string; value: string }[];
    };
    steps: {
      image: string | null;
      title: { code: string; value: string }[];
      text: { code: string; value: string }[];
    }[];
    weekdaysOrdersSchedule: string;
    weekendOrdersSchedule: string;
    weekdaysDrivingSchedule: string;
    weekendDrivingSchedule: string;
  };
}

const labels = ['Крок 1', 'Крок 2', 'Крок 3', 'Крок 4'];

export const Basic: React.FC<IBasicProps> = ({
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
        } else {
          const newArray = fieldsValues.steps.map((item: any, i: number) => {
            if (index === i && key) {
              return {
                ...item,
                [key]: file,
              };
            } else {
              return item;
            }
          });
          return {
            ...prevState,
            steps: {
              ...prevState.service,
              items: [...newArray],
            },
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
        const newArray = fieldsValues.steps.map((item: any, i: number) => {
          if (index === i && key) {
            return {
              ...item,
              [key]: null,
            };
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          steps: {
            ...prevState.service,
            items: [...newArray],
          },
        };
      }
    });
  };

  const handleFieldsChange = (e: React.ChangeEvent) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <>
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
                  onClick={() =>
                    handleDeleteImage('image', undefined, 'banner')
                  }
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
              {fieldsValues.service.image ? (
                <>
                  <img
                    src={fieldsValues.service.image}
                    alt={getAltText(fieldsValues.service.image)}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                </>
              ) : (
                <IconButton
                  onClick={() => openFileManager('image', undefined, 'service')}
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
            {fieldsValues.service.image ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <IconButton
                  className={cx(classes.newsImgBlockButton)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="edit"
                  onClick={() => openFileManager('image', undefined, 'service')}
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
                    handleDeleteImage('image', undefined, 'service')
                  }
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
      <Box className={cx(classes.bannerImagesBlock)}>
        {fieldsValues.steps.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <Box>
                <Typography component="h2" className={classes.descriptionText}>
                  {labels[index]}
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
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={getAltText(item.image)}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    </>
                  ) : (
                    <IconButton onClick={() => openFileManager('image', index)}>
                      <AddIcon
                        className={cx(
                          classes.addImageIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                  )}
                </Box>
                {item.image ? (
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <IconButton
                      className={cx(classes.newsImgBlockButton)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="edit"
                      onClick={() => openFileManager('image', index)}
                    >
                      <EditIcon
                        className={cx(
                          classes.editIcon,
                          darkTheme ? 'dark' : null
                        )}
                      />
                    </IconButton>
                    <IconButton
                      className={cx(classes.newsImgBlockButton)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="delete"
                      onClick={() => handleDeleteImage('image', index)}
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
          );
        })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '80px',
          flexWrap: 'wrap',
          marginTop: '16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '16px',
            width: '400px',
          }}
        >
          <InputLabel
            className={cx(
              classes.label,
              darkTheme ? 'dark' : null,
              'noBottomMargin'
            )}
          >
            Графік прийому замовлень
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekdaysOrdersSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekdaysOrdersSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Пн-Пт
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekendOrdersSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekendOrdersSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Сб
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '16px',
            width: '400px',
          }}
        >
          <InputLabel
            className={cx(
              classes.label,
              darkTheme ? 'dark' : null,
              'noBottomMargin'
            )}
          >
            Графік виїзду
          </InputLabel>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekdaysDrivingSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekdaysDrivingSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Пн-Пт
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
              mt: '16px',
              width: '100%',
            }}
          >
            <StyledField
              id="weekendDrivingSchedule"
              multiline
              variant="outlined"
              sx={{ flexGrow: 1 }}
              darkTheme={darkTheme}
              value={fieldsValues.weekendDrivingSchedule}
              onChange={handleFieldsChange}
            />
            <Typography
              component="p"
              sx={{ width: '48px', textAlign: 'center' }}
            >
              Сб
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
