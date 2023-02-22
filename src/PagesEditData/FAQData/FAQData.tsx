import React from 'react';
import { Box } from '@mui/material';
import { BasicFAQ } from './SubLinks';
import Modal from '../../components/Modal';
import { useLocation, useParams } from 'react-router-dom';
import { FAQRows } from '../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';

interface IFAQDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const links = [{ name: 'загальне', id: 1 }];

const FAQData: React.FC<IFAQDataProps> = ({
  pageName,
  initialLink,
  parentPageName,
}) => {
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const { darkTheme } = useGlobalContext();

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenQuestion = FAQRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenQuestion && chosenAction === 'edit'
      ? {
          question: [
            { code: 'uk', value: 'ukr question' },
            { code: 'en', value: 'eng question' },
          ],
          answer: [
            { code: 'uk', value: 'ukr answer' },
            { code: 'en', value: 'eng answer' },
          ],
          page: [],
        }
      : {
          question: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          answer: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          page: [],
        }
  );

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

  const handleClickLink = (id: number) => {
    setLinkId(id as number);
  };

  return (
    <Box>
      <PagesDataCommon
        chosenRowItem={chosenQuestion}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenQuestion ? chosenQuestion.name : null,
          pageName,
          parentPageName,
        }}
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
        {linkId === 1 && (
          <BasicFAQ
            darkTheme={darkTheme}
            fieldsValues={fieldsValues}
            setFieldsValues={setFieldsValues}
            languages={languages}
          />
        )}
      </Box>
      {openBackModal && (
        <Modal
          shouldOpenModal={openBackModal}
          handleCloseModal={handleCloseModal}
          type={'back'}
          link={initialLink}
        />
      )}
      {openDeleteModal && (
        <Modal
          shouldOpenModal={openDeleteModal}
          handleCloseModal={handleCloseModal}
          type={'delete'}
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

export default FAQData;
