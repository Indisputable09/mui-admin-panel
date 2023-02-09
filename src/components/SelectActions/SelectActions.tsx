import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import { Box, Typography } from '@mui/material';
import { useSelectActionsStyles } from './SelectActions.styles';

interface ISelectActions {
  handleUnselectAllRows: () => void;
  handleSelectAllRows: () => void;
  darkTheme: boolean;
  noCopy?: boolean;
  noCheckAll?: boolean;
}

const SelectActions: React.FC<ISelectActions> = ({
  darkTheme,
  noCopy = false,
  noCheckAll = false,
  handleSelectAllRows,
  handleUnselectAllRows,
}) => {
  const { classes, cx } = useSelectActionsStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        id="actions-button"
        edge="start"
        color="inherit"
        aria-label="actions"
        aria-controls={open ? 'actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuClick}
      >
        <SettingsIcon
          sx={{
            width: '28px',
            height: '28px',
          }}
        />
      </IconButton>
      <Menu
        id="actions-menu"
        aria-labelledby="actions-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={cx(classes.selectMenu, darkTheme ? 'dark' : null)}
      >
        {noCheckAll ? null : (
          <MenuItem value="всі" onClick={handleSelectAllRows}>
            <Box className={cx(classes.menuItem, darkTheme ? 'dark' : null)}>
              <IconButton
                sx={{ display: 'flex', justifyContent: 'center' }}
                size="small"
                edge="start"
                color="inherit"
                aria-label="delete"
              >
                <CheckBoxIcon />
              </IconButton>
              <Typography variant="h6" component="p" fontSize={15}>
                Обрати всі
              </Typography>
            </Box>
          </MenuItem>
        )}
        <MenuItem value="Відмінити" onClick={handleUnselectAllRows}>
          <Box className={cx(classes.menuItem, darkTheme ? 'dark' : null)}>
            <IconButton
              sx={{ display: 'flex', justifyContent: 'center' }}
              size="small"
              edge="start"
              color="inherit"
              aria-label="delete"
            >
              <CheckBoxOutlineBlankIcon />
            </IconButton>
            <Typography variant="h6" component="p" fontSize={15}>
              Відмінити вибір
            </Typography>
          </Box>
        </MenuItem>
        {noCopy ? null : (
          <MenuItem value="копіювати">
            <Box className={cx(classes.menuItem, darkTheme ? 'dark' : null)}>
              <IconButton
                sx={{ display: 'flex', justifyContent: 'center' }}
                size="small"
                edge="start"
                color="inherit"
                aria-label="view"
              >
                <VisibilityIcon />
              </IconButton>
              <Typography variant="h6" component="p" fontSize={15}>
                Переглянути
              </Typography>
            </Box>
          </MenuItem>
        )}
        <MenuItem value="видалити">
          <Box className={cx(classes.menuItem, darkTheme ? 'dark' : null)}>
            <IconButton
              sx={{ display: 'flex', justifyContent: 'center' }}
              size="small"
              edge="start"
              color="inherit"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="h6" component="p" fontSize={15}>
              Видалити
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SelectActions;
