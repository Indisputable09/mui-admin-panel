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
import { SketchPicker } from 'react-color';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';
import Editor from '../../../../../components/Inputs/Editor';
import { LanguagesTabsList } from '../../../../PagesDataCommon/LanguagesTabsList';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    advices: {
      name: { code: string; value: string }[];
      title: { code: string; value: string }[];
      text: { code: string; value: string }[];
    }[];
    banner: {
      additionalColor: string;
      primaryColor: string;
      primaryText: { code: string; value: string }[];
      additionalText: { code: string; value: string }[];
      image: null | string;
      imageMobile: null | string;
      imageDesktop: null | string;
    };
  };
  languages: { value: string; code: string }[];
  initialValueWithLanguages: { value: string; code: string }[];
}

export const Data: React.FC<IDataProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
  languages,
  initialValueWithLanguages,
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
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsRendered(true);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleAddColorClick = (subIndex: number) => {
    setOpenColorPicker({ subIndex, open: true });
  };

  const handleAddClick = () => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        advices: [
          ...prevState.advices,
          {
            name: initialValueWithLanguages,
            title: initialValueWithLanguages,
            text: initialValueWithLanguages,
          },
        ],
      };
    });
  };

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ subIndex: null, open: false });
  };

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleDeleteBannerClick = (i: number) => {
    const filteredData = fieldsValues.advices.filter(
      (item: any, index: number) => index !== i
    );
    setOpenColorPicker({ subIndex: null, open: false });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        advices: filteredData,
      };
    });
  };

  const handleFieldsChange =
    (key: string, valuesIndex?: number) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        const newValues = prevState.banner[key].map(
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
            [key]: newValues,
          },
        };
      });
    };

  const handleBannerChange =
    (index: number, key: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState.advices.map((item: any, i: number) => {
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
          advices: newArray,
        };
      });
    };

  const handleColorChange = (key: string) => (color: any) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banner: { ...prevState.banner, [key]: color.hex },
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
      {fieldsValues.banner.primaryText.map((item, textIndex) => {
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
                  Головний текст у банері
                  <StyledField
                    id="primaryText"
                    variant="outlined"
                    sx={{ width: '100%', mt: '16px' }}
                    required
                    darkTheme={darkTheme}
                    value={item.value ? item.value : ''}
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
                      backgroundColor: `${fieldsValues.banner.primaryColor}`,
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
                        color={fieldsValues.banner.primaryColor}
                        onChangeComplete={handleColorChange('primaryColor')}
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
      {fieldsValues.banner.additionalText.map((item, textIndex) => {
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
                  Додатковий текст у банері
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
                      backgroundColor: `${fieldsValues.banner.additionalColor}`,
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
                        color={fieldsValues.banner.additionalColor}
                        onChangeComplete={handleColorChange('additionalColor')}
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
      {fieldsValues.advices.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Divider
              className={cx(
                classes.pricesBottomDivider,
                darkTheme ? 'dark' : null,
                'topMargin'
              )}
            />
            {item.title.map((title, titleIndex) => {
              return (
                <React.Fragment key={titleIndex}>
                  {title.code === languageCode && (
                    <InputLabel
                      htmlFor="title"
                      className={cx(
                        classes.label,
                        darkTheme ? 'dark' : null,
                        'topMargin'
                      )}
                    >
                      Назва блоку опису
                      <StyledField
                        id="title"
                        multiline
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        required
                        darkTheme={darkTheme}
                        value={title.value ? title.value : ''}
                        onChange={handleBannerChange(
                          index,
                          'title',
                          titleIndex
                        )}
                      />
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
            {item.name.map((name, nameIndex) => {
              return (
                <React.Fragment key={nameIndex}>
                  {name.code === languageCode && (
                    <InputLabel
                      htmlFor="name"
                      className={cx(classes.label, darkTheme ? 'dark' : null)}
                    >
                      Скорочена назва блоку опису
                      <StyledField
                        id="name"
                        multiline
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        required
                        darkTheme={darkTheme}
                        value={name.value ? name.value : ''}
                        onChange={handleBannerChange(index, 'name', nameIndex)}
                      />
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
            <Typography component="h2" className={classes.descriptionText}>
              Опис блоку
            </Typography>
            {isRendered &&
              item.text.map((text, textIndex) => {
                return (
                  <React.Fragment key={textIndex}>
                    {text.code === languageCode && (
                      <Editor
                        debug={false}
                        initData={text.value ? text.value : ''}
                        onChange={handleBannerChange(index, 'text', textIndex)}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            {fieldsValues.advices.length > 1 ? (
              <IconButton
                className={cx(classes.deleteBanner, darkTheme ? 'dark' : null)}
                onClick={() => handleDeleteBannerClick(index)}
              >
                <DeleteIcon sx={{ width: '28px', height: '28px' }} />
              </IconButton>
            ) : null}
          </React.Fragment>
        );
      })}
      <Divider
        className={cx(
          classes.pricesBottomDivider,
          darkTheme ? 'dark' : null,
          'topMargin'
        )}
      />
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
