import React from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  Typography,
} from '@mui/material';
import ColorizeIcon from '@mui/icons-material/Colorize';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StyledField from '../../../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { SketchPicker } from 'react-color';
import { LanguagesTabsList } from '../../../../PagesDataCommon/LanguagesTabsList';
import { useFileManager } from '../../../../../hooks/useFileManager';
import { getAltText } from '../../../../../constants';

interface IBannerProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banners: {
      additionalColor: string;
      primaryColor: string;
      image: null | string;
      imageMobile: null | string;
      imageDesktop: null | string;
      primaryText: { code: string; value: string }[];
      additionalText: { code: string; value: string }[];
      url: string;
    }[];
  };
  languages: { value: string; code: string }[];
  initialValueWithLanguages: { value: string; code: string }[];
}

export const Banner: React.FC<IBannerProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
  languages,
  initialValueWithLanguages,
}) => {
  const { openFileManager } = useFileManager(handleImageChange);
  const { classes, cx } = usePagesDataCommonStyles();
  const [languageCode, setLanguageCode] = React.useState<string>(
    languages[0].code
  );
  const [openColorPicker, setOpenColorPicker] = React.useState<{
    index: null | number;
    subIndex: null | number;
    open: boolean;
  }>({
    index: null,
    subIndex: null,
    open: false,
  });

  function handleImageChange(file: string | null) {
    return function (key?: string, index?: number) {
      setFieldsValues((prevState: typeof fieldsValues) => {
        const newArray = fieldsValues.banners.map((banner: any, i: number) => {
          if (index === i && key) {
            return {
              ...banner,
              [key]: file,
            };
          } else {
            return banner;
          }
        });
        return {
          ...prevState,
          banners: [...newArray],
        };
      });
    };
  }

  const handleDeleteImage = (key: string, index: number) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      const newArray = fieldsValues.banners.map((banner: any, i: number) => {
        if (index === i && key) {
          return {
            ...banner,
            [key]: null,
          };
        } else {
          return banner;
        }
      });
      return {
        ...prevState,
        banners: [...newArray],
      };
    });
  };

  const handleAddColorClick = (index: number, subIndex: number) => {
    setOpenColorPicker({ index, subIndex, open: true });
  };

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ index: null, subIndex: null, open: false });
  };

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        banners: [
          ...prevState.banners,
          {
            additionalColor: '',
            primaryColor: '',
            image: null,
            imageMobile: null,
            imageDesktop: null,
            primaryText: initialValueWithLanguages,
            additionalText: initialValueWithLanguages,
            url: '',
          },
        ],
      };
    });
  };

  const handleFieldsChange =
    (key: string, index?: number, valuesIndex?: number) =>
    (e: React.ChangeEvent) => {
      const newArray = fieldsValues.banners.map((banner: any, i: number) => {
        if (index === i) {
          if (key === 'url') {
            return {
              ...banner,
              [key]: (e.target as HTMLInputElement).value,
            };
          } else {
            const newValue = banner[key].map((item: any, subIndex: any) => {
              if (valuesIndex === subIndex) {
                return { ...item, value: (e.target as HTMLInputElement).value };
              } else return item;
            });
            return {
              ...banner,
              [key]: newValue,
            };
          }
        } else {
          return banner;
        }
      });
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          banners: [...newArray],
        };
      });
    };

  const handleColorChange = (key: string, index: number) => (color: any) => {
    const newArray = fieldsValues.banners.map((banner: any, i: number) => {
      if (index === i) {
        return {
          ...banner,
          [key]: color.hex,
        };
      } else {
        return banner;
      }
    });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return { ...prevState, banners: [...newArray] };
    });
  };

  const handleDeleteBannerClick = (i: number) => {
    const filteredData = fieldsValues.banners.filter(
      (item: any, index: number) => index !== i
    );
    setOpenColorPicker({ index: null, subIndex: null, open: false });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banners: filteredData,
      };
    });
  };

  return (
    <>
      <LanguagesTabsList
        handleLanguageClick={handleLanguageClick}
        languageCode={languageCode}
        languages={languages}
      />
      {fieldsValues.banners.length === 0
        ? null
        : fieldsValues.banners.map((banner, index) => {
            return (
              <React.Fragment key={index}>
                <Box className={cx(classes.bannerImagesBlock)}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography
                        component="h2"
                        className={classes.descriptionText}
                      >
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
                        {banner.image ? (
                          <>
                            <img
                              src={banner.image}
                              alt={getAltText(banner.image)}
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          </>
                        ) : (
                          <IconButton
                            onClick={() => openFileManager('image', index)}
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
                      {banner.image ? (
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box>
                      <Typography
                        component="h2"
                        className={classes.descriptionText}
                      >
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
                        {banner.imageMobile ? (
                          <>
                            <img
                              src={banner.imageMobile}
                              alt={getAltText(banner.imageMobile)}
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          </>
                        ) : (
                          <IconButton
                            onClick={() =>
                              openFileManager('imageMobile', index)
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
                      {banner.imageMobile ? (
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <IconButton
                            className={cx(classes.newsImgBlockButton)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="edit"
                            onClick={() =>
                              openFileManager('imageMobile', index)
                            }
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
                            onClick={() =>
                              handleDeleteImage('imageMobile', index)
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
                      <Typography
                        component="h2"
                        className={classes.descriptionText}
                      >
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
                        {banner.imageDesktop ? (
                          <>
                            <img
                              src={banner.imageDesktop}
                              alt={getAltText(banner.imageDesktop)}
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          </>
                        ) : (
                          <IconButton
                            onClick={() =>
                              openFileManager('imageDesktop', index)
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
                      {banner.imageDesktop ? (
                        <Box sx={{ display: 'flex', gap: 3 }}>
                          <IconButton
                            className={cx(classes.newsImgBlockButton)}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="edit"
                            onClick={() =>
                              openFileManager('imageDesktop', index)
                            }
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
                            onClick={() =>
                              handleDeleteImage('imageDesktop', index)
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
                {banner.primaryText.map((item, textIndex) => {
                  return (
                    <React.Fragment key={textIndex}>
                      {item.code === languageCode && (
                        <>
                          <InputLabel
                            htmlFor="primaryText"
                            className={cx(
                              classes.label,
                              darkTheme ? 'dark' : null,
                              'topMargin',
                              'noBottomMargin'
                            )}
                          >
                            Головний текст
                            <StyledField
                              id="primaryText"
                              variant="outlined"
                              sx={{ width: '100%', mt: '16px' }}
                              required
                              darkTheme={darkTheme}
                              value={item.value ? item.value : ''}
                              onChange={handleFieldsChange(
                                'primaryText',
                                index,
                                textIndex
                              )}
                            />
                          </InputLabel>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                            }}
                          >
                            <IconButton
                              className={cx(
                                classes.attributeActionsButtons,
                                darkTheme ? 'dark' : null,
                                'banner'
                              )}
                              onClick={() => handleAddColorClick(index, 0)}
                            >
                              <ColorizeIcon
                                sx={{ width: '24px', height: '24px' }}
                              />
                            </IconButton>
                            <Typography
                              component="h2"
                              className={classes.smallText}
                            >
                              Обрати колір тексту
                            </Typography>
                            <Box
                              sx={{
                                backgroundColor: `${banner.primaryColor}`,
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                marginLeft: '30px',
                                marginRight: '30px',
                                border: '1px solid grey',
                              }}
                            ></Box>
                            {index === openColorPicker.index &&
                              openColorPicker.subIndex === 0 &&
                              openColorPicker.open && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: '40px',
                                    left: '100px',
                                    zIndex: 10,
                                  }}
                                >
                                  <SketchPicker
                                    className={cx(
                                      classes.colorPicker,
                                      darkTheme ? 'dark' : null
                                    )}
                                    color={
                                      banner.primaryColor
                                        ? banner.primaryColor
                                        : ''
                                    }
                                    onChangeComplete={handleColorChange(
                                      'primaryColor',
                                      index
                                    )}
                                    disableAlpha
                                  />
                                  <IconButton
                                    sx={{
                                      position: 'absolute',
                                      top: '-20px',
                                      right: '-20px',
                                      border: '1px solid grey',
                                      padding: '4px',
                                    }}
                                    onClick={handleCloseColorPicker}
                                  >
                                    <CloseIcon
                                      sx={{ width: '20px', height: '20px' }}
                                    />
                                  </IconButton>
                                </Box>
                              )}
                          </Box>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
                {banner.additionalText.map((item, textIndex) => {
                  return (
                    <React.Fragment key={textIndex}>
                      {item.code === languageCode && (
                        <>
                          <InputLabel
                            htmlFor="additionalText"
                            className={cx(
                              classes.label,
                              darkTheme ? 'dark' : null,
                              'topMargin',
                              'noBottomMargin'
                            )}
                          >
                            Додатковий текст
                            <StyledField
                              id="additionalText"
                              variant="outlined"
                              sx={{
                                width: '100%',
                                mt: '16px',
                              }}
                              required
                              darkTheme={darkTheme}
                              value={item.value ? item.value : ''}
                              onChange={handleFieldsChange(
                                'additionalText',
                                index,
                                textIndex
                              )}
                            />
                          </InputLabel>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              position: 'relative',
                            }}
                          >
                            <IconButton
                              className={cx(
                                classes.attributeActionsButtons,
                                darkTheme ? 'dark' : null,
                                'banner'
                              )}
                              onClick={() => handleAddColorClick(index, 1)}
                            >
                              <ColorizeIcon
                                sx={{ width: '24px', height: '24px' }}
                              />
                            </IconButton>
                            <Typography
                              component="h2"
                              className={classes.smallText}
                            >
                              Обрати колір тексту
                            </Typography>
                            <Box
                              sx={{
                                backgroundColor: `${banner.additionalColor}`,
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                marginLeft: '30px',
                                marginRight: '30px',
                                border: '1px solid grey',
                              }}
                            ></Box>
                            {index === openColorPicker.index &&
                              openColorPicker.subIndex === 1 &&
                              openColorPicker.open && (
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: '40px',
                                    left: '100px',
                                    zIndex: 10,
                                  }}
                                >
                                  <SketchPicker
                                    className={cx(
                                      classes.colorPicker,
                                      darkTheme ? 'dark' : null
                                    )}
                                    color={
                                      banner.additionalColor
                                        ? banner.additionalColor
                                        : ''
                                    }
                                    onChangeComplete={handleColorChange(
                                      'additionalColor',
                                      index
                                    )}
                                    disableAlpha
                                  />
                                  <IconButton
                                    sx={{
                                      position: 'absolute',
                                      top: '-20px',
                                      right: '-20px',
                                      border: '1px solid grey',
                                      padding: '4px',
                                    }}
                                    onClick={handleCloseColorPicker}
                                  >
                                    <CloseIcon
                                      sx={{ width: '20px', height: '20px' }}
                                    />
                                  </IconButton>
                                </Box>
                              )}
                          </Box>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
                <InputLabel
                  htmlFor="url"
                  className={cx(
                    classes.label,
                    darkTheme ? 'dark' : null,
                    'topMargin'
                  )}
                >
                  URL
                  <StyledField
                    id="url"
                    variant="outlined"
                    sx={{ width: '100%', mt: '16px' }}
                    darkTheme={darkTheme}
                    value={banner.url ? banner.url : ''}
                    onChange={handleFieldsChange('url', index)}
                  />
                </InputLabel>
                {fieldsValues.banners.length > 1 ? (
                  <IconButton
                    className={cx(
                      classes.deleteBanner,
                      darkTheme ? 'dark' : null
                    )}
                    onClick={() => handleDeleteBannerClick(index)}
                  >
                    <DeleteIcon sx={{ width: '28px', height: '28px' }} />
                  </IconButton>
                ) : null}
                <Divider
                  className={cx(
                    classes.pricesBottomDivider,
                    darkTheme ? 'dark' : null,
                    'topMargin',
                    index === fieldsValues.banners.length - 1
                      ? 'noBottomMargin'
                      : null
                  )}
                />
              </React.Fragment>
            );
          })}
      <Button
        onClick={handleAddClick}
        variant="contained"
        className={cx(classes.addButton, darkTheme ? 'dark' : null)}
      >
        <AddIcon /> Додати
      </Button>
    </>
  );
};
