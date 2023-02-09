import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMoreActionsStyles } from './MoreActionsStyles';
import Modal from '../../Modal';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { Link } from 'react-router-dom';

interface IMoreActionsProps {
  id: string;
}

const MoreActions: React.FC<IMoreActionsProps> = ({ id }) => {
  const { darkTheme } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    handleClose();
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { classes, cx } = useMoreActionsStyles();

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Link to={`${id}/edit`}>
        <IconButton
          sx={{ display: 'flex', justifyContent: 'center' }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="edit"
        >
          <EditIcon
            className={cx(classes.editIcon, darkTheme ? 'dark' : null)}
          />
        </IconButton>
      </Link>
      <IconButton
        className={cx(classes.moreIconButton, darkTheme ? 'dark' : null)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="more-actions"
        onClick={handleMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-actions"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={cx(classes.moreActionsMenu, darkTheme ? 'dark' : null)}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
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
        {/* <MenuItem onClick={handleClose}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <IconButton
              sx={{ display: 'flex', justifyContent: 'center' }}
              size="small"
              edge="start"
              color="inherit"
              aria-label="copy"
            >
              <ContentCopyIcon />
            </IconButton>
            <Typography variant="h6" component="p" fontSize={15}>
              Копіювати
            </Typography>
          </Box>
        </MenuItem> */}
        <MenuItem onClick={handleClickOpenModal}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <IconButton
              sx={{ display: 'flex', justifyContent: 'center' }}
              size="small"
              edge="start"
              color="inherit"
              aria-label="delete"
              // onClick={handleClickOpenModal}
            >
              <DeleteIcon />
            </IconButton>
            <Typography variant="h6" component="p" fontSize={15}>
              Видалити
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
      {openDeleteModal && (
        <Modal
          shouldOpenModal={openDeleteModal}
          handleCloseModal={handleCloseModal}
          type={'delete'}
        />
      )}
    </Box>
  );
};

export default MoreActions;
