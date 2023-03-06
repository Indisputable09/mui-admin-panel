import React from 'react';
import { Box } from '@mui/material';
import { BasicFAQ } from './SubLinks';
import Modal from '../../components/Modal';
import { useParams } from 'react-router-dom';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { haveSameData, Status } from '../../constants';
import { fetchLanguages } from '../../services/languagesAPI';
import { IFAQ } from '../../types/faqTypes';
import {
  fetchFAQById,
  handleAddFAQ,
  handleDeleteFAQ,
  handleSendFAQData,
} from '../../services/faqAPI';
import Loader from '../../components/Loader';

interface IFAQDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [{ name: 'загальне', id: 1 }];

const FAQData: React.FC<IFAQDataProps> = ({
  pageName,
  initialLink,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const { darkTheme } = useGlobalContext();
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialValueWithLanguages, setInitialValueWithLanguages] =
    React.useState([{ code: 'uk', value: '' }]);
  const [languagesList, setLanguagesList] = React.useState([]);
  const [initialData, setInitialData] = React.useState<IFAQ>({
    question: initialValueWithLanguages,
    answer: initialValueWithLanguages,
  });
  const [fieldsValues, setFieldsValues] = React.useState<IFAQ>(initialData);
  const [chosenFAQName, setChosenFAQName] = React.useState<string>('');

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

  const handleClickOpenModal = (variant: string) => {
    if (variant === 'back') {
      setOpenBackModal(true);
    } else if (variant === 'delete') {
      setOpenDeleteModal(true);
    } else if (variant === 'save') {
      setOpenSaveModal(true);
    }
  };

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const FAQById = await fetchFAQById(id as string);
          setFieldsValues(FAQById);
          setInitialData(FAQById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        question: initialValueWithLanguages,
        answer: initialValueWithLanguages,
      });
    }
  }, [id, initialValueWithLanguages, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.question.find(item => item.code === 'uk');
      if (ukName) {
        setChosenFAQName(ukName!.value);
      }
    }
  }, [fieldsValues]);

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
              name: chosenFAQName ? chosenFAQName : null,
              pageName,
              parentPageName,
            }}
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
              <BasicFAQ
                darkTheme={darkTheme}
                fieldsValues={fieldsValues}
                setFieldsValues={setFieldsValues}
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
              handleDeleteData={() => handleDeleteFAQ(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendFAQData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddFAQ(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FAQData;
