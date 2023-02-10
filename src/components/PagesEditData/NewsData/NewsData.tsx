import React from 'react';
import { Box } from '@mui/material';
import { Content, Data } from './Sublinks';
import Modal from '../../Modal';
import { useLocation, useParams } from 'react-router-dom';
import { newsRows } from '../../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import dayjs from 'dayjs';

interface IAnalysesDataProps {
  initialLink: string;
  pageName: string;
}

const links = [
  { name: 'дані', id: 1 },
  { name: 'контент', id: 2 },
];

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const AnalysesData: React.FC<IAnalysesDataProps> = ({
  initialLink,
  pageName,
}) => {
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenNews = newsRows.find(row => row.id === Number(id));

  const currentDay = dayjs(new Date().toISOString().slice(0, 10));

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenNews && chosenAction === 'edit'
      ? {
          image: null,
          active: false,
          creationDate: currentDay.toDate(),
          url: 'url',
          name: [
            { code: 'uk', value: 'ukr value' },
            { code: 'en', value: 'eng value' },
          ],
          metaTitle: [
            { code: 'uk', value: 'ukr metaTitle' },
            { code: 'en', value: 'eng metaTitle' },
          ],
          metaDescription: [
            { code: 'uk', value: 'ukr metaDescription' },
            { code: 'en', value: 'eng metaDescription' },
          ],
          shortDescription: [
            { code: 'uk', value: 'ukr shortDescription' },
            { code: 'en', value: 'eng shortDescription' },
          ],
          description: [
            { code: 'uk', value: 'ukr description' },
            { code: 'en', value: 'eng description' },
          ],
        }
      : {
          image: null,
          active: false,
          creationDate: currentDay.toDate(),
          url: 'url',
          name: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          metaTitle: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          metaDescription: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          shortDescription: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          description: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
        }
  );
  console.log('fieldsValues', fieldsValues);

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
        chosenRowItem={chosenNews}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenNews ? chosenNews.name : null,
          pageName: pageName,
        }}
        visibilityIcon
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
          <Data
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
          />
        )}
        {linkId === 2 && (
          <Content
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
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

export default AnalysesData;
