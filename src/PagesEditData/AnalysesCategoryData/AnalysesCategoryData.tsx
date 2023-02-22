import React from 'react';
import { Box } from '@mui/material';
import { AnalysesCategoryBasic, AnalysesCategorySEO } from './SubLinks';
import { useLocation, useParams } from 'react-router-dom';
import { analysesCategoriesRows } from '../../TableRows/TableRows';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';

interface IAnalysesCategoriesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const links = [
  { name: 'категорія', id: 1 },
  { name: 'seo', id: 2 },
];

const AnalysesCategoriesData: React.FC<IAnalysesCategoriesDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
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
  const chosenCategory = analysesCategoriesRows.find(
    row => row.id === Number(id)
  );

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenCategory && chosenAction === 'edit'
      ? {
          name: [
            { code: 'uk', value: 'ukr value' },
            { code: 'en', value: 'eng value' },
          ],
          url: 'url',
          metaTitle: [
            { code: 'uk', value: 'ukr' },
            { code: 'en', value: 'eng' },
          ],
          metaDescription: [
            { code: 'uk', value: 'ukr' },
            { code: 'en', value: 'eng' },
          ],
        }
      : {
          name: [
            { code: 'uk', value: 'ukr value' },
            { code: 'en', value: 'eng value' },
          ],
          url: '',
          metaTitle: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          metaDescription: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
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
        chosenRowItem={chosenCategory}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenCategory ? chosenCategory.name : null,
          pageName,
          parentPageName,
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
          <AnalysesCategoryBasic
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
          />
        )}
        {linkId === 2 && (
          <AnalysesCategorySEO
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

export default AnalysesCategoriesData;
