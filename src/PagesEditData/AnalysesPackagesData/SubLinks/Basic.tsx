import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import Editor from '../../../components/Inputs/Editor';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    name: {
      code: string;
      value: string;
    }[];
    deadline: {
      code: string;
      value: string;
    }[];
    code: string;
    tabs: {
      id: string;
      label: string;
      name: {
        code: string;
        value: string;
      }[];
      description: {
        code: string;
        value: string;
      }[];
    }[];
  };
  languages: { name: string; id: number; code: string }[];
}

export const Basic: React.FC<IBasicProps> = ({
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

  const handleFieldsChange =
    (key?: string, index?: number) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        if (key) {
          const newArray = fieldsValues[key].map((item: any, i: any) => {
            if (index === i) {
              return { ...item, value: (e.target as HTMLInputElement).value };
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
        const newArray = prevState.tabs.map((item: any, i: number) => {
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
          tabs: newArray,
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
      {fieldsValues.name.map((name, index) => {
        return (
          <React.Fragment key={index}>
            {name.code === languageCode && (
              <InputLabel
                htmlFor="name"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                <div>
                  Назва<span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </div>
                <StyledField
                  id="name"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={name.value}
                  onChange={handleFieldsChange('name', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.deadline.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                htmlFor="deadline"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Термін виконання
                <StyledField
                  id="deadline"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value}
                  onChange={handleFieldsChange('deadline', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.tabs.map((tab, index) => {
        return (
          <React.Fragment key={index}>
            {tab.name.map((item, nameIndex) => {
              return (
                <React.Fragment key={nameIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      htmlFor={tab.id}
                      className={cx(
                        classes.label,
                        darkTheme ? 'dark' : null,
                        index === 0 ? null : 'topMargin'
                      )}
                    >
                      {tab.label}
                      <StyledField
                        id={tab.id}
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        required
                        darkTheme={darkTheme}
                        value={item.value}
                        onChange={handleTabsChange(index, 'name', nameIndex)}
                      />
                    </InputLabel>
                  )}
                </React.Fragment>
              );
            })}
            {tab.description.map((item, descriptionIndex) => {
              return (
                <React.Fragment key={descriptionIndex}>
                  {item.code === languageCode && (
                    <Editor
                      debug={false}
                      initData={item.value}
                      onChange={handleTabsChange(
                        index,
                        'description',
                        descriptionIndex
                      )}
                      // onChange={handleTabsChange(
                      //   index,
                      //   'description',
                      //   descriptionIndex
                      // )}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};
