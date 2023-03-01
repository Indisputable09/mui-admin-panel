import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { useBasicActionsStyles } from './BasicActions.styles';
import Modal from '../../Modal';
import { Link, useLocation } from 'react-router-dom';

interface IBasicActionsProps {
  id: string;
  onlyEdit?: boolean;
  pagesLinkName?: string;
  handleDeleteData?: () => void;
}

const BasicActions: React.FC<IBasicActionsProps> = ({
  id,
  onlyEdit = false,
  pagesLinkName,
  handleDeleteData,
}) => {
  const { darkTheme } = useGlobalContext();
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);

  const location = useLocation();

  const handleClickOpenModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
    setOpenDeleteModal(false);
  };

  const { classes, cx } = useBasicActionsStyles();

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Link to={pagesLinkName ? `${id}/${pagesLinkName}/edit` : `${id}/edit`}>
          <IconButton
            sx={{ display: 'flex', justifyContent: 'center', marginLeft: 0 }}
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
        {onlyEdit ? null : (
          <IconButton
            sx={{ display: 'flex', justifyContent: 'center' }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="delete"
            onClick={handleClickOpenModal}
          >
            <DeleteIcon
              className={cx(classes.deleteIcon, darkTheme ? 'dark' : null)}
            />
          </IconButton>
        )}
      </Box>
      {openDeleteModal && (
        <Modal
          shouldOpenModal={openDeleteModal}
          handleCloseModal={handleCloseModal}
          type={'delete'}
          link={location.pathname}
          handleDeleteData={handleDeleteData}
        />
      )}
    </>
  );
};

export default BasicActions;
