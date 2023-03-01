import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import CollapsedBreadcrumbs from '../../components/Crumbs';
import { usePagesDataCommonStyles } from './PagesDataCommon.styles';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { useNavigate } from 'react-router-dom';

interface IPagesDataCommonProps {
  chosenRowItem?: any;
  handleClickOpenModal: (variant: string) => void;
  linkId?: number;
  links?: { name: string; id: number }[];
  handleClickLink?: (id: number) => void;
  linksData: {
    link: string;
    name?: string | null;
    pageName: string;
    parentPageName: string;
  };
  visibilityIcon?: boolean;
  noDeleteIcon?: boolean;
  noBackIcon?: boolean;
  noSaveIcon?: boolean;
  dataWasChanged?: boolean;
}

const PagesDataCommon: React.FC<IPagesDataCommonProps> = ({
  dataWasChanged,
  handleClickOpenModal,
  linkId,
  links,
  handleClickLink,
  linksData,
  visibilityIcon = false,
  noDeleteIcon = false,
  noBackIcon = false,
  noSaveIcon = false,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <Box className={classes.panel}>
        <Box>
          <CollapsedBreadcrumbs linksData={linksData} darkTheme={darkTheme} />
          {linksData && (
            <Typography component="h2" className={classes.productTitle}>
              {linksData.name}
            </Typography>
          )}
        </Box>
        <Box className={classes.buttonsBlock}>
          {noBackIcon ? null : (
            <IconButton
              className={classes.button}
              size="small"
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() =>
                dataWasChanged
                  ? handleClickOpenModal('back')
                  : navigate(linksData.link)
              }
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          {visibilityIcon && (
            <IconButton
              className={classes.button}
              size="small"
              edge="start"
              color="inherit"
              aria-label="view"
            >
              <VisibilityIcon />
            </IconButton>
          )}
          {noSaveIcon ? null : (
            <IconButton
              className={classes.button}
              size="small"
              edge="start"
              color="inherit"
              aria-label="save"
              onClick={() => handleClickOpenModal('save')}
              disabled={!dataWasChanged}
              type="submit"
            >
              <SaveIcon />
            </IconButton>
          )}
          {noDeleteIcon ? null : (
            <IconButton
              className={classes.button}
              size="small"
              edge="start"
              color="inherit"
              aria-label="delete"
              onClick={() => handleClickOpenModal('delete')}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>
      {links && handleClickLink && (
        <>
          <List className={classes.linksList}>
            {links.map(link => {
              return (
                <ListItem
                  key={link.id}
                  className={classes.linksListItem}
                  onClick={() => handleClickLink(link.id)}
                >
                  <Typography
                    className={cx(
                      classes.linksListText,
                      linkId === link.id ? 'active' : null,
                      darkTheme ? 'dark' : null
                    )}
                    component="p"
                  >
                    {link.name.toLocaleUpperCase()}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <Divider className={cx(classes.divider, darkTheme ? 'dark' : null)} />
        </>
      )}
    </>
  );
};

export default PagesDataCommon;
