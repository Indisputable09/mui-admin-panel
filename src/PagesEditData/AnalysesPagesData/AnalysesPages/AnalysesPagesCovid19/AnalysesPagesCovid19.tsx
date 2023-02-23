import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { analysesPagesRows } from '../../../../TableRows/TableRows';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Basic, SEO, Data } from './SubLinks';
import { nanoid } from 'nanoid';

interface IAnalysesPagesCovid19Props {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'seo', id: 3 },
];

export const AnalysesPagesCovid19: React.FC<IAnalysesPagesCovid19Props> = ({
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
  const chosenPackage = analysesPagesRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState({
    image: '',
    mobileImage: '',
    analyses: [],
    data: {
      id: nanoid(),
      primaryText: {
        id: nanoid(),
        color: '#ffffff',
        text: [
          { code: 'uk', value: 'ukr' },
          { code: 'en', value: 'eng' },
        ],
      },
      additionalText: {
        id: nanoid(),
        color: '#ffffff',
        text: [
          { code: 'uk', value: 'ukr' },
          { code: 'en', value: 'eng' },
        ],
      },
      banners: [
        {
          id: nanoid(),
          name: [
            { code: 'uk', value: 'ukr' },
            { code: 'en', value: 'eng' },
          ],
          description: [
            { code: 'uk', value: 'ukr' },
            { code: 'en', value: 'eng' },
          ],
        },
      ],
    },
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
        chosenRowItem={chosenPackage}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenPackage ? chosenPackage.name : null,
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
          <Basic
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
          />
        )}
        {linkId === 2 && (
          <Data
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
          />
        )}
        {linkId === 3 && (
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
