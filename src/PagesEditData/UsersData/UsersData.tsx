import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, InputLabel } from '@mui/material';
import { useGlobalContext } from '../../hooks/GlobalContext';
import PagesDataCommon from '../PagesDataCommon';
import Modal from '../../components/Modal';
import StyledField from '../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { haveSameData, Status } from '../../constants';
import Loader from '../../components/Loader';
import { IUser } from '../../types/userTypes';
import {
  fetchAdminById,
  handleAddAdmin,
  handleDeleteAdmin,
  handleSendAdminData,
} from '../../services/adminsAPI';

interface IUsersDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const UsersData: React.FC<IUsersDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const currentDay = new Date().toISOString().slice(0, 10);
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<IUser>({
    name: '',
    email: '',
  });
  const [fieldsValues, setFieldsValues] = React.useState<IUser>(initialData);
  const [chosenUserName, setChosenUserName] = React.useState<string>('');

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const userById = await fetchAdminById(id as string);
          setFieldsValues(userById);
          setInitialData(userById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        name: '',
        email: '',
      });
    }
  }, [currentDay, id, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name;
      if (ukName) {
        setChosenUserName(ukName);
      }
    }
  }, [fieldsValues]);

  const handleClickOpenModal = (variant: string) => {
    if (variant === 'back') {
      setOpenBackModal(true);
    } else if (variant === 'delete') {
      setOpenDeleteModal(true);
    } else if (variant === 'save') {
      setOpenSaveModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenBackModal(false);
    setOpenDeleteModal(false);
    setOpenSaveModal(false);
  };

  const handleFieldsChange = (e: any) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <Box>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={handleClickOpenModal}
            linksData={{
              link: initialLink,
              name: chosenUserName ? chosenUserName : null,
              pageName,
              parentPageName,
            }}
            dataWasChanged={dataWasChanged}
          />
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pt: '24px',
              pb: '48px',
            }}
          >
            <InputLabel
              htmlFor="name"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Ім'я
              <StyledField
                id="name"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.name ? fieldsValues.name : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>

            <InputLabel
              htmlFor="email"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              E-mail
              <StyledField
                id="email"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.email ? fieldsValues.email : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>
          </Box>
          {openBackModal && (
            <Modal
              shouldOpenModal={openBackModal}
              handleCloseModal={handleCloseModal}
              type={'back'}
              link={initialLink}
              dataWasChanged={dataWasChanged}
            />
          )}
          {openDeleteModal && (
            <Modal
              shouldOpenModal={openDeleteModal}
              handleCloseModal={handleCloseModal}
              type={'delete'}
              link={initialLink}
              handleDeleteData={() => handleDeleteAdmin(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendAdminData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddAdmin(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default UsersData;
