import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { toast } from 'react-toastify';
import { token } from '../../services/authAPI';
import { useNavigate } from 'react-router-dom';

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
}

const Modal: React.FC<IModalProps> = ({
  shouldOpenModal,
  handleCloseModal,
  type = 'delete',
  link,
  dataToSend,
  setLoggedIn,
}) => {
  const navigate = useNavigate();

  const handleAgreeClick = () => {
    console.log('Agreed, do some action');
    handleCloseModal();
    if (dataToSend) {
      console.log(`Send to server: `, dataToSend);
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
