import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Basic, Data, SEO } from './SubLinks';
import { useGlobalContext } from '../../hooks/GlobalContext';
import PagesDataCommon from '../PagesDataCommon';
import Modal from '../../components/Modal';
import { haveSameData, Status } from '../../constants';
import { IAction } from '../../types/actionTypes';
import { fetchLanguages } from '../../services/languagesAPI';
import {
  fetchActionById,
  handleAddAction,
  handleDeleteAction,
  handleSendActionData,
} from '../../services/actionsAPI';
import Loader from '../../components/Loader';

interface IActionsDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'seo', id: 3 },
];

const ActionsData: React.FC<IActionsDataProps> = ({
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
  const [initialValueWithLanguages, setInitialValueWithLanguages] =
    React.useState([{ code: 'uk', value: '' }]);
  const [languagesList, setLanguagesList] = React.useState([]);
  const [initialData, setInitialData] = React.useState<IAction>({
    name: initialValueWithLanguages,
    description: initialValueWithLanguages,
    image: '',
    analyses: null,
    finishDate: currentDay,
    published: false,
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
    indexed: false,
    url: '',
  });
  const [fieldsValues, setFieldsValues] = React.useState<IAction>(initialData);
  const [chosenActionName, setChosenActionName] = React.useState<string>('');

  React.useEffect(() => {
    const result = languagesList.map(
      (language: { code: string; value: string }) => {
        return { code: language.code, value: '' };
      }
    );
    setInitialValueWithLanguages(result);
  }, [languagesList]);

  React.useEffect(() => {
    const getLanguages = async () => {
      try {
        setStatus(pending);
        const languages = await fetchLanguages();
        setLanguagesList(languages);
        setStatus(resolved);
      } catch (error) {
        setStatus(rejected);
      }
    };
    getLanguages();
  }, [pending, rejected, resolved]);

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const actionById = await fetchActionById(id as string);
          setFieldsValues(actionById);
          setInitialData(actionById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        name: initialValueWithLanguages,
        description: initialValueWithLanguages,
        image: '',
        analyses: null,
        finishDate: currentDay,
        published: false,
        metaTitle: initialValueWithLanguages,
        metaDescription: initialValueWithLanguages,
        indexed: false,
        url: '',
      });
    }
  }, [currentDay, id, initialValueWithLanguages, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name.find(item => item.code === 'uk');
      if (ukName) {
        setChosenActionName(ukName!.value);
      }
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
              name: chosenActionName ? chosenActionName : null,
              pageName,
              parentPageName,
            }}
            visibilityIcon
            noDeleteIcon
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
            {linkId === 1 && languagesList.length !== 0 && (
              <Basic
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
              />
            )}
            {linkId === 2 && (
              <Data
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
              />
            )}
            {linkId === 3 && languagesList.length !== 0 && (
              <SEO
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
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
              handleDeleteData={() => handleDeleteAction(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendActionData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddAction(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ActionsData;
