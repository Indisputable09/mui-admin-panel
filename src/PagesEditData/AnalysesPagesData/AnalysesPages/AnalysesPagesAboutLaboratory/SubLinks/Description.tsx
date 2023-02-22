import React from 'react';
import {
  Box,
  IconButton,
  InputLabel,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StyledField from '../../../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import Editor from '../../../../../components/Inputs/Editor';
import { stopInputScroll } from '../../../../../constants';

interface IDescriptionProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    descriptionImage: string;
    title: { code: string; value: string }[];
    description: { code: string; value: string }[];
    tabs: {
      id: string;
      label: string;
      quantity: number;
      name: { code: string; value: string }[];
    }[];
    goal: { code: string; value: string }[];
    values: {
      id: string;
      label: string;
      name: { code: string; value: string }[];
    }[];
  };
  languages: { id: number; code: string; name: string }[];
}

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
    (index: number, field: string, key: string, valuesIndex?: number) =>
    (e: any) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState[key].map((item: any, i: number) => {
          if (index === i) {
            if (field === 'quantity') {
              return {
                ...item,
                [field]: Number((e.target as HTMLInputElement).value),
              };
            } else {
              const newValues = item[field].map(
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
                [field]: [...newValues],
              };
            }
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          [key]: newArray,
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
              {fieldsValues.descriptionImage ? null : (
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
            {fieldsValues.descriptionImage ? (
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
      {fieldsValues.title.map((title, index) => {
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
                Заголовок
                <StyledField
                  id="title"
                  multiline
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
      {fieldsValues.tabs.map((tab, index) => {
        return (
          <React.Fragment key={index}>
            {tab.name.map((item, tabIndex) => {
              return (
                <React.Fragment key={tabIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      htmlFor={tab.id}
                      className={cx(
                        classes.label,
                        darkTheme ? 'dark' : null,
                        index === 0 ? 'topMargin' : null
                      )}
                    >
                      {tab.label}
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
                          value={Number(tab.quantity).toString()}
                          onChange={handleTabsChange(
                            index,
                            'quantity',
                            'tabs',
                            tabIndex
                          )}
                        />
                        <StyledField
                          id={tab.id}
                          variant="outlined"
                          sx={{ flexGrow: 1, mt: '16px' }}
                          required
                          darkTheme={darkTheme}
                          value={item.value}
                          onChange={handleTabsChange(
                            index,
                            'name',
                            'tabs',
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
      {fieldsValues.values.map((value, index) => {
        return (
          <React.Fragment key={index}>
            {value.name.map((item, valueIndex) => {
              return (
                <React.Fragment key={valueIndex}>
                  {item.code === languageCode && (
                    <InputLabel
                      htmlFor={value.id}
                      className={cx(classes.label, darkTheme ? 'dark' : null)}
                    >
                      {value.label}
                      <StyledField
                        id={value.id}
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        required
                        darkTheme={darkTheme}
                        value={item.value}
                        onChange={handleTabsChange(
                          index,
                          'name',
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
    </>
  );
};
