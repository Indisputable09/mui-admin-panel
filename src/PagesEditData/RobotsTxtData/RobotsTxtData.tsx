import { Box, InputLabel } from '@mui/material';
import { nanoid } from 'nanoid';
import React from 'react';
import { useGlobalContext } from '../../hooks/GlobalContext';
import StyledField from '../../components/Inputs/StyledField';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';

interface IRobotsTxtDataProps {
  pageName: string;
  link: string;
  parentPageName: string;
}

const RobotsTxtData: React.FC<IRobotsTxtDataProps> = ({
  pageName,
  link,
  parentPageName,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [fieldsValues, setFieldsValues] = React.useState({
    robots: '',
  });

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
      <PagesDataCommon
        chosenRowItem={{ name: 'robots', id: nanoid() }}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link,
          pageName,
          parentPageName,
        }}
        noDeleteIcon
        noBackIcon
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
          htmlFor="robots"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          <StyledField
            id="robots"
            multiline
            rows={20}
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={fieldsValues.robots}
            onChange={handleFieldsChange}
          />
        </InputLabel>
        {openSaveModal && (
          <Modal
            shouldOpenModal={openSaveModal}
            handleCloseModal={handleCloseModal}
            type={'save'}
            dataToSend={fieldsValues}
          />
        )}
      </Box>
    </>
  );
};

export default RobotsTxtData;
