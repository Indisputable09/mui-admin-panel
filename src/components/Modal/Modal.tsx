import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import { token } from '../../services/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/GlobalContext';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IModalProps {
  shouldOpenModal: boolean;
  handleCloseModal: () => void;
  type?: string;
  link?: string;
  dataToSend?: any;
  setLoggedIn?: (user: boolean) => void;
  handleEditData?: () => void;
  handlePostData?: () => void;
  handleDeleteData?: () => void;
  dataWasChanged?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  shouldOpenModal,
  handleCloseModal,
  type = 'delete',
  link,
  dataToSend,
  setLoggedIn,
  handleEditData,
  handlePostData,
  handleDeleteData,
  dataWasChanged,
}) => {
  const navigate = useNavigate();
  const { rerenderComponent, setRerenderComponent } = useGlobalContext();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];

  const handleSave = async () => {
    try {
      if (chosenAction === 'edit' || activePath.includes('robots')) {
        handleEditData!();
      } else {
        handlePostData!();
      }
    } catch (error) {}
  };

  const handleAgreeClick = async () => {
    handleCloseModal();
    if (dataToSend && (handleEditData || handlePostData)) {
      handleSave();
    }
    if (link) {
      navigate(link);
    }
    if (type === 'logout' && setLoggedIn) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      token.unset();
      setLoggedIn(false);
      toast.success('Ви успішно вийшли!');
    }
    if (type === 'delete' && handleDeleteData && link) {
      try {
        setRerenderComponent(!rerenderComponent);
        handleDeleteData();
        navigate(link);
      } catch (error) {}
    }
  };

  const handleDisagreeClick = () => {
    handleCloseModal();
    console.log('User disagreed');
  };

  return (
    <div>
      <Dialog
        open={shouldOpenModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
        sx={{ width: '444px', textAlign: 'center', mx: 'auto' }}
      >
        <DialogTitle>
          {type === 'delete' && 'Ви впевнені, що хочете видалити?'}
          {type === 'save' && 'Ви впевнені, що хочете зберегти?'}
          {type === 'back' &&
            'Змінені дані не будуть збережені. Бажаєте покинути сторінку?'}
          {type === 'logout' && 'Ви впевнені, що хочете вийти?'}
        </DialogTitle>
        <DialogActions sx={{}}>
          <Button
            onClick={handleAgreeClick}
            variant="outlined"
            sx={{ width: '50%' }}
          >
            Так
          </Button>
          <Button
            onClick={handleDisagreeClick}
            variant="contained"
            sx={{ width: '50%' }}
          >
            Скасувати
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
