import React from 'react';
import {
  Box,
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
import { SketchPicker } from 'react-color';

interface IBannerProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banner: {
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
    };
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
    subIndex: null | number;
    open: boolean;
  }>({
    subIndex: null,
    open: false,
  });

  const handleAddColorClick = (subIndex: number) => {
    setOpenColorPicker({ subIndex, open: true });
  };

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ subIndex: null, open: false });
  };

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange =
    (key: string, valuesIndex?: number) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        const newValues = prevState.banner[key].text.map(
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
          ...prevState,
          banner: {
            ...prevState.banner,
            [key]: {
              ...prevState.banner[key],
              text: newValues,
            },
          },
        };
      });
    };

  const handleColorChange = (key: string) => (color: any) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banner: {
          ...prevState.banner,
          [key]: {
            ...prevState.banner[key],
            color: color.hex,
          },
        },
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
              {fieldsValues.banner.img ? null : (
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
            {fieldsValues.banner.img ? (
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
              {fieldsValues.banner.mobileImg ? null : (
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
            {fieldsValues.banner.mobileImg ? (
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
      {fieldsValues.banner.primaryText.text.map((item, textIndex) => {
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
                    onChange={handleFieldsChange('primaryText', textIndex)}
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
                    onClick={() => handleAddColorClick(0)}
                  >
                    <ColorizeIcon sx={{ width: '24px', height: '24px' }} />
                  </IconButton>
                  <Typography component="h2" className={classes.smallText}>
                    Обрати колір тексту
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: `${fieldsValues.banner.primaryText.color}`,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      marginLeft: '30px',
                      marginRight: '30px',
                      border: '1px solid grey',
                    }}
                  ></Box>
                  {openColorPicker.subIndex === 0 && openColorPicker.open && (
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
                        color={fieldsValues.banner.primaryText.color}
                        onChangeComplete={handleColorChange('primaryText')}
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
                        <CloseIcon sx={{ width: '20px', height: '20px' }} />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.banner.additionalText.text.map((item, textIndex) => {
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
                    onChange={handleFieldsChange('additionalText', textIndex)}
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
                    onClick={() => handleAddColorClick(1)}
                  >
                    <ColorizeIcon sx={{ width: '24px', height: '24px' }} />
                  </IconButton>
                  <Typography component="h2" className={classes.smallText}>
                    Обрати колір тексту
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: `${fieldsValues.banner.additionalText.color}`,
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      marginLeft: '30px',
                      marginRight: '30px',
                      border: '1px solid grey',
                    }}
                  ></Box>
                  {openColorPicker.subIndex === 1 && openColorPicker.open && (
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
                        color={fieldsValues.banner.additionalText.color}
                        onChangeComplete={handleColorChange('additionalText')}
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
                        <CloseIcon sx={{ width: '20px', height: '20px' }} />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
