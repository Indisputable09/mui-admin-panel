import React from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { analysesPagesRows } from '../../../../TableRows/TableRows';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Banner, Description, Gallery, SEO } from './SubLinks';

interface IAnalysesPagesAboutLaboratoryProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const links = [
  { name: 'банер', id: 1 },
  { name: 'опис', id: 2 },
  { name: 'галерея', id: 3 },
  { name: 'seo', id: 4 },
];

const AnalysesPagesAboutLaboratory: React.FC<
  IAnalysesPagesAboutLaboratoryProps
> = ({ initialLink, pageName, parentPageName }) => {
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();

  const chosenPage = analysesPagesRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState({
    banner: {
      id: nanoid(),
      img: '',
      mobileImg: '',
      primaryText: {
        id: nanoid(3),
        color: '',
        text: [
          { code: 'uk', value: 'ukr value' },
          { code: 'en', value: 'eng value' },
        ],
      },
      additionalText: {
        id: nanoid(3),
        color: '',
        text: [
          { code: 'uk', value: 'ukr value' },
          { code: 'en', value: 'eng value' },
        ],
      },
    },
    descriptionImage: '',
    title: [
      { code: 'uk', value: 'ukr value' },
      { code: 'en', value: 'eng value' },
    ],
    description: [
      { code: 'uk', value: 'ukr value' },
      { code: 'en', value: 'eng value' },
    ],
    tabs: [
      {
        id: 'tab1',
        label: 'Блок 1',
        quantity: 0,
        name: [
          { code: 'uk', value: 'ukr name 1' },
          { code: 'en', value: 'eng name 1' },
        ],
      },
      {
        id: 'tab2',
        label: 'Блок 2',
        quantity: 0,
        name: [
          { code: 'uk', value: 'ukr name 2' },
          { code: 'en', value: 'eng name 2' },
        ],
      },
      {
        id: 'tab3',
        label: 'Блок 3',
        quantity: 0,
        name: [
          { code: 'uk', value: 'ukr name 3' },
          { code: 'en', value: 'eng name 3' },
        ],
      },
    ],
    goal: [
      { code: 'uk', value: 'ukr value' },
      { code: 'en', value: 'eng value' },
    ],
    values: [
      {
        id: 'values1',
        label: 'Цінності 1',
        name: [
          { code: 'uk', value: 'ukr name 1' },
          { code: 'en', value: 'eng name 1' },
        ],
      },
      {
        id: 'values2',
        label: 'Цінності 2',
        name: [
          { code: 'uk', value: 'ukr name 2' },
          { code: 'en', value: 'eng name 2' },
        ],
      },
      {
        id: 'values3',
        label: 'Цінності 3',
        name: [
          { code: 'uk', value: 'ukr name 3' },
          { code: 'en', value: 'eng name 3' },
        ],
      },
      {
        id: 'values4',
        label: 'Цінності 4',
        name: [
          { code: 'uk', value: 'ukr name 3' },
          { code: 'en', value: 'eng name 3' },
        ],
      },
    ],
    gallery: [{ id: nanoid(), image: '' }],
    metaTitle: [
      { code: 'uk', value: 'ukr' },
      { code: 'en', value: 'eng' },
    ],
    metaDescription: [
      { code: 'uk', value: 'ukr' },
      { code: 'en', value: 'eng' },
    ],
    indexed: true,
  });

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
        chosenRowItem={chosenPage}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenPage ? chosenPage.name : null,
          pageName,
          parentPageName,
        }}
        visibilityIcon
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
        {linkId === 1 && (
          <Banner
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
          />
        )}
        {linkId === 2 && (
          <Description
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
          />
        )}
        {linkId === 3 && (
          <Gallery
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
          />
        )}
        {linkId === 4 && (
          <SEO
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

export default AnalysesPagesAboutLaboratory;
