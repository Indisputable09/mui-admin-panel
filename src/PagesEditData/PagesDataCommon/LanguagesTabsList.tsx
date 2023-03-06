import { List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { usePagesDataCommonStyles } from './PagesDataCommon.styles';

interface ILanguagesTabsListProps {
  languages: { code: string; value: string }[];
  languageCode: string;
  handleLanguageClick: (code: string) => void;
}

export const LanguagesTabsList: React.FC<ILanguagesTabsListProps> = ({
  languages,
  languageCode,
  handleLanguageClick,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();

  return (
    <List className={classes.languagesList}>
      {languages.map(language => {
        return (
          <ListItem
            key={language.code}
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
              {language.value.toLocaleUpperCase().slice(0, 3)}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};
