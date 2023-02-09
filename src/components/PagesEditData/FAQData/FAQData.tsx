import React from 'react';
import { Box } from '@mui/material';
import { BasicFAQ, ConnectionsFAQ } from './SubLinks';
import Modal from '../../Modal';
import { useLocation, useParams } from 'react-router-dom';
import { FAQRows } from '../../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';

interface IFAQDataProps {
  darkTheme: boolean;
  initialLink: string;
}

const languages = [
  { name: 'Укр', id: 1 },
  { name: 'Eng', id: 2 },
];

const links = [
  { name: 'загальне', id: 1 },
  { name: "зв'язок", id: 2 },
];

const FAQData: React.FC<IFAQDataProps> = ({ darkTheme, initialLink }) => {
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenQuestion = FAQRows.find(row => row.id === Number(id));

  const [FAQFieldsValues, setFAQFieldsValues] = React.useState(
    chosenQuestion && chosenAction === 'edit'
      ? {
          question: chosenQuestion.name,
          questionEng: 'questionEng',
          answer: '',
          answerEng: 'answerEng',
          page: [],
        }
      : {
          question: '',
          questionEng: '',
          answer: '',
          answerEng: '',
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
          link: '/products/FAQ',
          name: chosenQuestion ? chosenQuestion.name : null,
          pageName: 'FAQ`s',
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
            FAQFieldsValues={FAQFieldsValues}
            setFAQFieldsValues={setFAQFieldsValues}
            languages={languages}
          />
        )}
        {linkId === 2 && (
          <ConnectionsFAQ
            darkTheme={darkTheme}
            FAQFieldsValues={FAQFieldsValues}
            setFAQFieldsValues={setFAQFieldsValues}
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
        />
      )}
    </Box>
  );
};

export default FAQData;
