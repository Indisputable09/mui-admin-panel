import React from 'react';
import { Box, IconButton, InputLabel, Typography } from '@mui/material';
import ColorizeIcon from '@mui/icons-material/Colorize';
import CloseIcon from '@mui/icons-material/Close';
import { SketchPicker } from 'react-color';
import StyledField from '../../../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import Editor from '../../../../../components/Inputs/Editor';
import { stopInputScroll } from '../../../../../constants';
import { LanguagesTabsList } from '../../../../PagesDataCommon/LanguagesTabsList';

interface IDescriptionProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    banner: {
      additionalColor: string;
      primaryColor: string;
      image: string | null;
      imageMobile: string | null;
      imageDesktop: null | string;
      primaryText: {
        code: string;
        value: string;
      }[];
      additionalText: {
        code: string;
        value: string;
      }[];
    };
    title: { code: string; value: string }[];
    description: { code: string; value: string }[];
    blocks: {
      value: number | null;
      text: { code: string; value: string }[];
    }[];
    bottomText: { code: string; value: string }[];
    mission: { code: string; value: string }[];
    values: {
      text: { code: string; value: string }[];
    }[];
  };
  languages: { code: string; value: string }[];
}

const blocksLabels = ['Блок 1', 'Блок 2', 'Блок 3'];
const valuesLabels = ['Цінності 1', 'Цінності 2', 'Цінності 3', 'Цінності 4'];

export const Description: React.FC<IDescriptionProps> = ({
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

  const handleCloseColorPicker = () => {
    setOpenColorPicker({ subIndex: null, open: false });
  };

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange =
    (key?: string, index?: number, mainKey?: string) => (e: any) => {
      setFieldsValues((prevState: any) => {
        if (key && mainKey) {
          const newArray = fieldsValues[mainKey][key].map(
            (item: any, i: any) => {
              return { ...item, value: (e.target as HTMLInputElement).value };
            }
          );
          return {
            ...prevState,
            [mainKey]: {
              ...prevState[mainKey],
              [key]: [...newArray],
            },
          };
        } else if (key) {
          const newArray = fieldsValues[key].map((item: any, i: any) => {
            if (index === i) {
              if (e.hasOwnProperty('editor')) {
                return {
                  ...item,
                  value: e.editor.getData(),
                };
              } else {
                return { ...item, value: (e.target as HTMLInputElement).value };
              }
            } else return item;
          });
          return {
            ...prevState,
            [key]: [...newArray],
          };
        } else {
          return {
            ...prevState,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        }
      });
    };

  const handleBlocksChange =
    (index: number, key: string, mainKey: string, valuesIndex?: number) =>
    (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState[mainKey].map((item: any, i: number) => {
          if (index === i) {
            if (key === 'value') {
              return {
                ...item,
                [key]: Number((e.target as HTMLInputElement).value),
              };
            } else {
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
            }
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          [mainKey]: newArray,
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
                    onChange={handleFieldsChange(
                      'primaryText',
                      textIndex,
                      'banner'
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
                      textIndex,
                      'banner'
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
      {fieldsValues.title.map((title, titleIndex) => {
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
                  onChange={handleFieldsChange('title', titleIndex)}
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
        fieldsValues.description.map((description, descriptionIndex) => {
          return (
            <React.Fragment key={descriptionIndex}>
              {description.code === languageCode && (
                <Editor
                  debug={false}
                  initData={description.value ? description.value : ''}
                  onChange={handleFieldsChange('description', descriptionIndex)}
                />
              )}
            </React.Fragment>
          );
        })}
      {fieldsValues.blocks.map((tab, index) => {
        return (
          <React.Fragment key={index}>
            {tab.text.map((item, tabIndex) => {
              return (
                <React.Fragment key={tabIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      className={cx(
                        classes.label,
                        darkTheme ? 'dark' : null,
                        index === 0 ? 'topMargin' : null
                      )}
                    >
                      {blocksLabels[index]}
                      <Box sx={{ display: 'flex', gap: '16px' }}>
                        <StyledField
                          type="number"
                          onWheel={e => {
                            stopInputScroll(e);
                          }}
                          variant="outlined"
                          sx={{ width: '100px', mt: '16px' }}
                          required
                          darkTheme={darkTheme}
                          value={Number(tab.value).toString()}
                          onChange={handleBlocksChange(
                            index,
                            'value',
                            'blocks',
                            tabIndex
                          )}
                        />
                        <StyledField
                          variant="outlined"
                          sx={{ flexGrow: 1, mt: '16px' }}
                          required
                          darkTheme={darkTheme}
                          value={item.value}
                          onChange={handleBlocksChange(
                            index,
                            'text',
                            'blocks',
                            tabIndex
                          )}
                        />
                      </Box>
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {fieldsValues.mission.map((item, valueIndex) => {
        return (
          <React.Fragment key={valueIndex}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Наша місія
                <StyledField
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  darkTheme={darkTheme}
                  value={item.value ? item.value : ''}
                  onChange={handleFieldsChange('mission', valueIndex)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.values.map((value, index) => {
        return (
          <React.Fragment key={index}>
            {value.text.map((item, valueIndex) => {
              return (
                <React.Fragment key={valueIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      className={cx(classes.label, darkTheme ? 'dark' : null)}
                    >
                      {valuesLabels[index]}
                      <StyledField
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        darkTheme={darkTheme}
                        value={item.value ? item.value : ''}
                        onChange={handleBlocksChange(
                          index,
                          'text',
                          'values',
                          valueIndex
                        )}
                      />
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {fieldsValues.bottomText.map((item, valueIndex) => {
        return (
          <React.Fragment key={valueIndex}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Текст в нижньому блоці
                <StyledField
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  darkTheme={darkTheme}
                  value={item.value ? item.value : ''}
                  onChange={handleFieldsChange('bottomText', valueIndex)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
