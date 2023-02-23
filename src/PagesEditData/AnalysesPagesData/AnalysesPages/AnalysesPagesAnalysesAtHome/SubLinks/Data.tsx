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
import { SketchPicker } from 'react-color';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';
import Editor from '../../../../../components/Inputs/Editor';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    data: {
      id: string;
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
      steps: {
        id: string;
        title: {
          code: string;
          value: string;
        }[];
        description: {
          code: string;
          value: string;
        }[];
        label: string;
      }[];
      description: {
        code: string;
        value: string;
      }[];
    };
  };
  languages: { name: string; id: number; code: string }[];
}

export const Data: React.FC<IDataProps> = ({
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
    (key: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        if (key === 'description') {
          const newValues = prevState.data[key].map(
            (subItem: any, subIndex: number) => {
              if (subIndex === valuesIndex) {
                return {
                  ...subItem,
                  value: e.editor.getData(),
                };
              } else {
                return subItem;
              }
            }
          );
          return {
            ...prevState,
            data: {
              ...prevState.data,
              [key]: newValues,
            },
          };
        } else {
          const newValues = prevState.data[key].text.map(
            (subItem: any, subIndex: number) => {
              if (subIndex === valuesIndex) {
                if (e.hasOwnProperty('editor')) {
                  return {
                    ...subItem,
                    value: e.editor.getData(),
                  };
                } else {
                  return {
                    ...subItem,
                    value: (e.target as HTMLInputElement).value,
                  };
                }
                //   return {
                //     ...subItem,
                //     value: (e.target as HTMLInputElement).value,
                //   };
              } else {
                return subItem;
              }
            }
          );
          return {
            ...prevState,
            data: {
              ...prevState.data,
              [key]: {
                ...prevState.data[key],
                text: newValues,
              },
            },
          };
        }
      });
    };

  const handleStepsChange =
    (index: number, key: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState.data.steps.map((item: any, i: number) => {
          if (index === i) {
            const newValues = item[key].map(
              (subItem: any, subIndex: number) => {
                if (subIndex === valuesIndex) {
                  if (e.hasOwnProperty('editor')) {
                    return {
                      ...subItem,
                      value: e.editor.getData(),
                    };
                  } else {
                    return {
                      ...subItem,
                      value: (e.target as HTMLInputElement).value,
                    };
                  }
                } else {
                  return subItem;
                }
              }
            );
            return {
              ...item,
              [key]: [...newValues],
            };
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          data: {
            ...prevState.data,
            steps: newArray,
          },
        };
      });
    };

  const handleColorChange = (key: string) => (color: any) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          [key]: {
            ...prevState.data[key],
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
      {fieldsValues.data.primaryText.text.map((item, textIndex) => {
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
                      backgroundColor: `${fieldsValues.data.primaryText.color}`,
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
                        color={fieldsValues.data.primaryText.color}
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
      {fieldsValues.data.additionalText.text.map((item, textIndex) => {
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
                      backgroundColor: `${fieldsValues.data.additionalText.color}`,
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
                        color={fieldsValues.data.additionalText.color}
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
      {fieldsValues.data.steps.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <InputLabel
              className={cx(
                classes.label,
                darkTheme ? 'dark' : null,
                'topMargin',
                'noBottomMargin'
              )}
            >
              {item.label}
            </InputLabel>
            {item.title.map((title, titleIndex) => {
              return (
                <React.Fragment key={titleIndex}>
                  {title.code === languageCode && (
                    <StyledField
                      id="title"
                      multiline
                      variant="outlined"
                      sx={{ width: '100%', mt: '16px' }}
                      required
                      darkTheme={darkTheme}
                      value={title.value}
                      onChange={handleStepsChange(index, 'title', titleIndex)}
                    />
                  )}
                </React.Fragment>
              );
            })}
            {item.description.map((description, descriptionIndex) => {
              return (
                <React.Fragment key={descriptionIndex}>
                  {description.code === languageCode && (
                    <StyledField
                      id="description"
                      multiline
                      variant="outlined"
                      sx={{ width: '100%', mt: '16px' }}
                      required
                      darkTheme={darkTheme}
                      value={description.value}
                      onChange={handleStepsChange(
                        index,
                        'description',
                        descriptionIndex
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}

            {/* <Typography component="h2" className={classes.descriptionText}>
              Опис блоку
            </Typography>
            {item.description.map((description, descriptionIndex) => {
              return (
                <React.Fragment key={descriptionIndex}>
                  {description.code === languageCode && (
                    <Editor
                      debug={false}
                      initData={description.value}
                      onChange={handleBannerChange(
                        index,
                        'description',
                        descriptionIndex
                      )}
                    />
                  )}
                </React.Fragment>
              );
            })}
            {fieldsValues.data.banners.length > 1 ? (
              <IconButton
                className={cx(classes.deleteBanner, darkTheme ? 'dark' : null)}
                onClick={() => handleDeleteBannerClick(item.id)}
              >
                <DeleteIcon sx={{ width: '28px', height: '28px' }} />
              </IconButton>
            ) : null} */}
          </React.Fragment>
        );
      })}
      <Typography component="h2" className={classes.descriptionText}>
        Опис блоку
      </Typography>
      {fieldsValues.data.description.map((description, descriptionIndex) => {
        return (
          <React.Fragment key={descriptionIndex}>
            {description.code === languageCode && (
              <Editor
                debug={false}
                initData={description.value}
                onChange={handleFieldsChange('description', descriptionIndex)}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
