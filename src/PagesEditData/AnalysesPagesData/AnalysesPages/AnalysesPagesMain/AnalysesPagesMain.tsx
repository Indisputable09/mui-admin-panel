import React from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { analysesPagesRows } from '../../../../TableRows/TableRows';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Banner, Description, Popular, SEO } from './Sublinks';

interface IAnalysesPagesMainProps {
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
  { name: 'популярні', id: 2 },
  { name: 'опис', id: 3 },
  { name: 'seo', id: 4 },
];

export const AnalysesPagesMain: React.FC<IAnalysesPagesMainProps> = ({
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
  const chosenPage = analysesPagesRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState({
    banners: [
      {
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
        url: '',
      },
    ],
    popularAnalyses: [],
    popularAnalysesPackages: [],
    actions: [],
    news: [],
    title: [
      { code: 'uk', value: 'ukr value' },
      { code: 'en', value: 'eng value' },
    ],
    description: [
      { code: 'uk', value: '<p>ukr description</p>' },
      { code: 'en', value: 'eng description' },
    ],
    texts: [
      {
        id: 'text1',
        label: 'Текст 1',
        name: [
          { code: 'uk', value: 'ukr name 1' },
          { code: 'en', value: 'eng name 1' },
        ],
      },
      {
        id: 'text2',
        label: 'Текст 2',
        name: [
          { code: 'uk', value: 'ukr name 2' },
          { code: 'en', value: 'eng name 2' },
        ],
      },
      {
        id: 'text3',
        label: 'Текст 3',
        name: [
          { code: 'uk', value: 'ukr name 3' },
          { code: 'en', value: 'eng name 3' },
        ],
      },
      {
        id: 'text4',
        label: 'Текст 4',
        name: [
          { code: 'uk', value: 'ukr name 3' },
          { code: 'en', value: 'eng name 3' },
        ],
      },
    ],
    copyright: [
      { code: 'uk', value: 'ukr description' },
      { code: 'en', value: 'eng description' },
    ],
    metaTitle: [
      { code: 'uk', value: 'ukr' },
      { code: 'en', value: 'eng' },
    ],
    metaDescription: [
      { code: 'uk', value: 'ukr' },
      { code: 'en', value: 'eng' },
    ],
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
          <Popular
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
          />
        )}
        {linkId === 3 && (
          <Description
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
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
