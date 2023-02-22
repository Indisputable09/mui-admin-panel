import React from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ColorizeIcon from '@mui/icons-material/Colorize';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StyledField from '../../../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';
import { SketchPicker } from 'react-color';

interface IBannerProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banners: {
      id: string;
      img: string;
      mobileImg: string;
      primaryText: {
        id: string;
        color: string;
        text: {
          code: string;
          value: string;
        }[];
      };
      additionalText: {
        id: string;
        color: string;
        text: {
          code: string;
          value: string;
        }[];
      };
      url: string;
    }[];
  };
  languages: { name: string; id: number; code: string }[];
}

export const Banner: React.FC<IBannerProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
  languages,
}) => {
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
            id: nanoid(),
            img: '',
            mobileImg: '',
            primaryText: {
              id: nanoid(3),
              color: '',
              text: [
                { code: 'uk', value: 'ukr value' },
                { code: 'en', value: 'eng value' },
              ],
            },
            additionalText: {
              id: nanoid(3),
              color: '',
              text: [
                { code: 'uk', value: 'ukr value' },
                { code: 'en', value: 'eng value' },
              ],
            },
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
            const newValues = banner[key].text.map(
              (subItem: any, subIndex: number) => {
                if (subIndex === valuesIndex) {
                  return {
                    ...subItem,
                    value: (e.target as HTMLInputElement).value,
                  };
                } else {
                  return subItem;
                }
              }
            );
            return {
              ...banner,
              [key]: {
                ...banner[key],
                text: newValues,
              },
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
          [key]: {
            ...banner[key],
            color: color.hex,
          },
        };
      } else {
        return banner;
      }
    });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return { ...prevState, banners: [...newArray] };
    });
  };

  const handleDeleteBannerClick = (id: string) => {
    const filteredData = fieldsValues.banners.filter(
      (item: any) => item.id !== id
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
      <List className={classes.languagesList}>
        {languages.map(language => {
          return (
            <ListItem
              key={language.id}
              className={classes.languagesListItem}
              onClick={() => handleLanguageClick(language.code)}
            >
              <Typography
                className={cx(
                  classes.languagesListText,
                  languageCode === language.code ? 'active' : null,
                  darkTheme ? 'dark' : null
                )}
                component="p"
              >
                {language.name.toLocaleUpperCase()}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      {fieldsValues.banners.length === 0
        ? null
        : fieldsValues.banners.map((banner, index) => {
            return (
              <React.Fragment key={banner.id}>
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
                        {banner.img ? null : (
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
                      {banner.img ? (
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
                      <Typography
                        component="h2"
                        className={classes.descriptionText}
                      >
                        Зображення для мобільної версії
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
                        {banner.mobileImg ? null : (
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
                      {banner.mobileImg ? (
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
                {banner.primaryText.text.map((item, textIndex) => {
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
                              value={item.value}
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
                                backgroundColor: `${banner.primaryText.color}`,
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
                                    color={banner.primaryText.color}
                                    onChangeComplete={handleColorChange(
                                      'primaryText',
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
                {banner.additionalText.text.map((item, textIndex) => {
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
                              value={item.value}
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
                                backgroundColor: `${banner.additionalText.color}`,
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
                                    color={banner.additionalText.color}
                                    onChangeComplete={handleColorChange(
                                      'additionalText',
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
                    value={banner.url}
                    onChange={handleFieldsChange('url', index)}
                  />
                </InputLabel>
                {fieldsValues.banners.length > 1 ? (
                  <IconButton
                    className={cx(
                      classes.deleteBanner,
                      darkTheme ? 'dark' : null
                    )}
                    onClick={() => handleDeleteBannerClick(banner.id)}
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
