import React from 'react';
import { Box } from '@mui/material';
import { Basic, Data, SEO } from './Sublinks';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import {
  fetchNewsById,
  handleDeleteNews,
  handleSendNewsData,
  handleAddNews,
} from '../../services/newsAPI';
import { INews } from '../../types/newsTypes';
import Loader from '../../components/Loader';
import { haveSameData, Status } from '../../constants';

interface INewsDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'seo', id: 3 },
];

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const NewsData: React.FC<INewsDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const currentDay = new Date().toISOString().slice(0, 10);
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<INews>({
    name: [
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
    image: null,
    published: false,
    publicationDate: currentDay,
    url: '',
    recommendedNews: null,
    metaTitle: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    metaDescription: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    indexed: true,
  });
  const [fieldsValues, setFieldsValues] = React.useState<INews>(initialData);
  const [chosenNewsName, setChosenNewsName] = React.useState<string>('');

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const newsById = await fetchNewsById(id as string);
          setFieldsValues(newsById);
          setInitialData(newsById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    }
  }, [id, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name.find(item => item.code === 'uk');
      setChosenNewsName(ukName!.value);
    }
  }, [fieldsValues]);

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
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={handleClickOpenModal}
            links={links}
            linkId={linkId}
            handleClickLink={handleClickLink}
            linksData={{
              link: initialLink,
              name: chosenNewsName ? chosenNewsName : null,
              pageName,
              parentPageName,
            }}
            visibilityIcon
            dataWasChanged={dataWasChanged}
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
              dataWasChanged={dataWasChanged}
            />
          )}
          {openDeleteModal && (
            <Modal
              shouldOpenModal={openDeleteModal}
              handleCloseModal={handleCloseModal}
              type={'delete'}
              link={initialLink}
              handleDeleteData={() => handleDeleteNews(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendNewsData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddNews(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default NewsData;
