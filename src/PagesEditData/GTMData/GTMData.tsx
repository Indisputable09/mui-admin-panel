import { Box, InputLabel } from '@mui/material';
import React from 'react';
import { useGlobalContext } from '../../hooks/GlobalContext';
import StyledField from '../../components/Inputs/StyledField';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { haveSameData, Status } from '../../constants';
import { fetchGtm, handleSendGtmData } from '../../services/gtmAPI';
import { IRobots } from '../../types/robotsTypes';
import Loader from '../../components/Loader';

interface IGTMDataProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const GTMData: React.FC<IGTMDataProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const [status, setStatus] = React.useState(idle);
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<IRobots>({
    content: '',
  });
  const [fieldsValues, setFieldsValues] = React.useState<IRobots>(initialData);

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(pending);
        const gtmValue = await fetchGtm();
        setFieldsValues(gtmValue);
        setInitialData(gtmValue);
        setStatus(resolved);
      } catch (error) {
        setStatus(rejected);
      }
    };
    fetchData();
  }, [pending, rejected, resolved]);

  const handleFieldsChange = (e: any) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  const handleClickOpenModal = (variant: string) => {
    setOpenSaveModal(true);
  };

  const handleCloseModal = () => {
    setOpenSaveModal(false);
  };

  return (
    <>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={handleClickOpenModal}
            linksData={{
              link,
              pageName,
              parentPageName,
            }}
            noDeleteIcon
            noBackIcon
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
              htmlFor="content"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              <StyledField
                id="content"
                multiline
                rows={20}
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.content ? fieldsValues.content : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>
            {openSaveModal && (
              <Modal
                shouldOpenModal={openSaveModal}
                handleCloseModal={handleCloseModal}
                type={'save'}
                dataToSend={fieldsValues}
                handleEditData={() => handleSendGtmData(fieldsValues)}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default GTMData;
