import React from 'react';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import ColorizeIcon from '@mui/icons-material/Colorize';
import CloseIcon from '@mui/icons-material/Close';
import { SketchPicker } from 'react-color';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';
import Editor from '../../../../../components/Inputs/Editor';
import { LanguagesTabsList } from '../../../../PagesDataCommon/LanguagesTabsList';
import { fetchFAQ } from '../../../../../services/faqAPI';
import MultipleAutocomplete from '../../../../../components/Inputs/MultipleAutocomplete';

interface IDataProps {
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
    faqs: number[] | null;
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
  };
  languages: { value: string; code: string }[];
}

const labels = ['Крок 1', 'Крок 2', 'Крок 3', 'Крок 4'];

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
  const [faqList, setFaqList] = React.useState([]);
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    const getFaqs = async () => {
      const list = await fetchFAQ();
      setFaqList(list);
    };
    getFaqs();
  }, []);

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

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ subIndex: null, open: false });
  };

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange =
    (key: string, mainKey: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        const newValues = prevState[mainKey][key].map(
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
          ...prevState,
          [mainKey]: {
            ...prevState[mainKey],
            [key]: newValues,
          },
        };
      });
    };

  const handleStepsChange =
    (index: number, key: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState.steps.map((item: any, i: number) => {
          if (index === i) {
            const newValues = item[key].map(
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
              ...item,
              [key]: [...newValues],
            };
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          steps: newArray,
        };
      });
    };

  const handleColorChange = (key: string) => (color: any) => {
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        banner: {
          ...prevState.banner,
          [key]: color.hex,
        },
      };
    });
  };

  const handleAutocompleteChange =
    (key: string) => (e: any, values: { id: number; value: string }[]) => {
      const chosenIds = values.map(item => item.id);
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: chosenIds,
        };
      });
    };

  const getAutocompleteValue = () => {
    const array = faqList.filter((item: any) =>
      fieldsValues.faqs?.includes(item.id)
    );
    return array.map((obj: { id: number; value: string }) => obj.value);
  };

  const autocompleteValue = getAutocompleteValue();

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
                    onChange={handleFieldsChange(
                      'primaryText',
                      'banner',
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
                    onChange={handleFieldsChange(
                      'additionalText',
                      'banner',
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
      {fieldsValues.steps.map((item, index) => {
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
              {labels[index]}
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
                      value={title.value ? title.value : ''}
                      onChange={handleStepsChange(index, 'title', titleIndex)}
                    />
                  )}
                </React.Fragment>
              );
            })}
            {item.text.map((text, textIndex) => {
              return (
                <React.Fragment key={textIndex}>
                  {text.code === languageCode && (
                    <StyledField
                      id="text"
                      multiline
                      variant="outlined"
                      sx={{ width: '100%', mt: '16px' }}
                      required
                      darkTheme={darkTheme}
                      value={text.value ? text.value : ''}
                      onChange={handleStepsChange(index, 'text', textIndex)}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {fieldsValues.service.title.map((title, index) => {
        return (
          <React.Fragment key={index}>
            {title.code === languageCode && (
              <InputLabel
                htmlFor="title"
                className={cx(
                  classes.label,
                  darkTheme ? 'dark' : null,
                  'topMargin'
                )}
              >
                Заголовок блоку опису
                <StyledField
                  id="title"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={title.value ? title.value : ''}
                  onChange={handleFieldsChange('title', 'service', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      <Typography component="h2" className={classes.descriptionText}>
        Текст опис
      </Typography>
      {isRendered &&
        fieldsValues.service.text.map((description, descriptionIndex) => {
          return (
            <React.Fragment key={descriptionIndex}>
              {description.code === languageCode && (
                <Editor
                  debug={false}
                  initData={description.value ? description.value : ''}
                  onChange={handleFieldsChange(
                    'text',
                    'service',
                    descriptionIndex
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      <InputLabel
        htmlFor="faq"
        className={cx(classes.label, darkTheme ? 'dark' : null, 'topMargin')}
      >
        Місто
        <MultipleAutocomplete
          id="faq"
          darkTheme={darkTheme}
          onChange={handleAutocompleteChange('faqs')}
          value={autocompleteValue}
          list={faqList}
          className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
        />
      </InputLabel>
    </>
  );
};
