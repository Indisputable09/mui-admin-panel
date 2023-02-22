import React from 'react';
import { Box } from '@mui/material';
import { Prices, Basic, Data, SEO } from './SubLinks';
import Modal from '../../components/Modal';
import { useLocation, useParams } from 'react-router-dom';
import { analysesRows } from '../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import { nanoid } from 'nanoid';
import { useGlobalContext } from '../../hooks/GlobalContext';

interface IAnalysesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'ціни', id: 3 },
  { name: 'seo', id: 4 },
];

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const AnalysesData: React.FC<IAnalysesDataProps> = ({
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
  const chosenAnalysis = analysesRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenAnalysis && chosenAction === 'edit'
      ? {
          name: [
            { code: 'uk', value: 'ukr value' },
            { code: 'en', value: 'eng value' },
          ],
          url: 'url',
          code: 'code',
          tabs: [
            {
              id: 'tab1',
              label: 'Вкладка 1',
              name: [
                { code: 'uk', value: 'ukr name 1' },
                { code: 'en', value: 'eng name 1' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 1</p>' },
                { code: 'en', value: '<p>description 1</p>' },
              ],
            },
            {
              id: 'tab2',
              label: 'Вкладка 2',
              name: [
                { code: 'uk', value: 'ukr name 2' },
                { code: 'en', value: 'eng name 2' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 2</p>' },
                { code: 'en', value: '<p>description 2</p>' },
              ],
            },
            {
              id: 'tab3',
              label: 'Вкладка 3',
              name: [
                { code: 'uk', value: 'ukr name 3' },
                { code: 'en', value: 'eng name 3' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 3</p>' },
                { code: 'en', value: '<p>description 3</p>' },
              ],
            },
          ],
          category: [],
          deadline: [
            { code: 'uk', value: 'uk deadline' },
            { code: 'en', value: 'en deadline' },
          ],
          published: true,
          makeAtHome: false,
          prices: [
            {
              id: nanoid(3),
              city: null,
              price: 0,
              priceWithDiscount: 0,
            },
          ],
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
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          url: '',
          code: 'code',
          tabs: [
            {
              id: 'tab1',
              label: 'Вкладка 1',
              name: [
                { code: 'uk', value: 'ukr name 1' },
                { code: 'en', value: 'eng name 1' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 1</p>' },
                { code: 'en', value: '<p>description 1</p>' },
              ],
            },
            {
              id: 'tab2',
              label: 'Вкладка 2',
              name: [
                { code: 'uk', value: 'ukr name 2' },
                { code: 'en', value: 'eng name 2' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 2</p>' },
                { code: 'en', value: '<p>description 2</p>' },
              ],
            },
            {
              id: 'tab3',
              label: 'Вкладка 3',
              name: [
                { code: 'uk', value: 'ukr name 3' },
                { code: 'en', value: 'eng name 3' },
              ],
              description: [
                { code: 'uk', value: '<p>опис 3</p>' },
                { code: 'en', value: '<p>description 3</p>' },
              ],
            },
          ],
          category: [],
          deadline: [
            { code: 'uk', value: '' },
            { code: 'en', value: '' },
          ],
          published: true,
          makeAtHome: false,
          prices: [],
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
        chosenRowItem={chosenAnalysis}
        handleClickOpenModal={handleClickOpenModal}
        links={links}
        linkId={linkId}
        handleClickLink={handleClickLink}
        linksData={{
          link: initialLink,
          name: chosenAnalysis ? chosenAnalysis.name : null,
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
          <Basic
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
            languages={languages}
          />
        )}
        {linkId === 2 && (
          <Data
            darkTheme={darkTheme}
            setFieldsValues={setFieldsValues}
            fieldsValues={fieldsValues}
          />
        )}
        {linkId === 3 && (
          <Prices
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

export default AnalysesData;
