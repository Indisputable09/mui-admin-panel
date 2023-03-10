import React from 'react';
import { InputLabel, Typography } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';
import Editor from '../../../../../components/Inputs/Editor';
import { LanguagesTabsList } from '../../../../PagesDataCommon/LanguagesTabsList';

interface IDescriptionProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    title: {
      code: string;
      value: string;
    }[];
    description: {
      code: string;
      value: string;
    }[];
    texts: {
      name: {
        code: string;
        value: string;
      }[];
    }[];
    copyright: {
      code: string;
      value: string;
    }[];
  };
  languages: { value: string; code: string }[];
}

const labels = ['Текст 1', 'Текст 2', 'Текст 3', 'Текст 4'];

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

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange = (key?: string, index?: number) => (e: any) => {
    setFieldsValues((prevState: any) => {
      if (key) {
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

  const handleTabsChange =
    (index: number, key: string, valuesIndex?: number) => (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState.texts.map((item: any, i: number) => {
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
          texts: newArray,
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
      {fieldsValues.title.map((title, index) => {
        return (
          <React.Fragment key={index}>
            {title.code === languageCode && (
              <InputLabel
                htmlFor="title"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Заголовок
                <StyledField
                  id="title"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={title.value}
                  onChange={handleFieldsChange('title', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      <Typography component="h2" className={classes.descriptionText}>
        Опис
      </Typography>
      {fieldsValues.description.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <Editor
                debug={false}
                initData={item.value}
                onChange={handleFieldsChange('description', index)}
              />
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.texts.map((text, index) => {
        return (
          <React.Fragment key={index}>
            {text.name.map((item, textIndex) => {
              return (
                <React.Fragment key={textIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      className={cx(
                        classes.label,
                        darkTheme ? 'dark' : null,
                        index === 0 ? 'topMargin' : null
                      )}
                    >
                      {labels[index]}
                      <StyledField
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        required
                        darkTheme={darkTheme}
                        value={item.value}
                        onChange={handleTabsChange(index, 'name', textIndex)}
                      />
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
      {fieldsValues.copyright.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                htmlFor="copyright"
                className={cx(
                  classes.label,
                  darkTheme ? 'dark' : null,
                  'noBottomMargin'
                )}
              >
                Копірайт у футері
                <StyledField
                  id="copyright"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value}
                  onChange={handleFieldsChange('copyright', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
