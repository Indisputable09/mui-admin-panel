import React from 'react';
import { Box, InputLabel } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import { redirectsRows } from '../../TableRows/TableRows';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import StyledField from '../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';

interface IRedirectsDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const RedirectsData: React.FC<IRedirectsDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenRedirect = redirectsRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenRedirect && chosenAction === 'edit'
      ? {
          from: chosenRedirect.from,
          to: chosenRedirect.to,
        }
      : {
          from: '',
          to: '',
        }
  );

  const handleClickOpenModal = (variant: string) => {
    if (variant === 'back') {
      setOpenBackModal(true);
    } else if (variant === 'save') {
      setOpenSaveModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenBackModal(false);
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
      <PagesDataCommon
        chosenRowItem={chosenRedirect}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link: initialLink,
          name: chosenRedirect ? chosenRedirect.from : null,
          pageName,
          parentPageName,
        }}
        noDeleteIcon
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
          htmlFor="from"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Звідки
          <StyledField
            id="from"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={fieldsValues.from}
            onChange={handleFieldsChange}
          />
        </InputLabel>
        <InputLabel
          htmlFor="to"
          className={cx(
            classes.label,
            darkTheme ? 'dark' : null,
            'noBottomMargin'
          )}
        >
          Куди
          <StyledField
            id="to"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={fieldsValues.to}
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
        />
      )}
      {openSaveModal && (
        <Modal
          shouldOpenModal={openSaveModal}
          handleCloseModal={handleCloseModal}
          type={'save'}
          dataToSend={fieldsValues}
        />
      )}
    </Box>
  );
};

export default RedirectsData;
