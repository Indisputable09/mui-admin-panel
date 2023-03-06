import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import PagesDataCommon from '../../PagesDataCommon';
import Modal from '../../../components/Modal';
import { Basic, Data } from './SubLinks';
import { haveSameData, Status } from '../../../constants';
import { IHeaderAdvertisement } from '../../../types/advertisementTypes';
import { fetchLanguages } from '../../../services/languagesAPI';
import {
  fetchAdvertisementByType,
  handleSendAdvertisementData,
} from '../../../services/advertisementsAPI';
import Loader from '../../../components/Loader';

interface IHeaderAdvertisementProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
];

const HeaderAdvertisement: React.FC<IHeaderAdvertisementProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialValueWithLanguages, setInitialValueWithLanguages] =
    React.useState([{ code: 'uk', value: '' }]);
  const [languagesList, setLanguagesList] = React.useState([]);
  const [initialData, setInitialData] = React.useState<IHeaderAdvertisement>({
    image: null,
    published: false,
    discount: null,
    name: '',
    text1: initialValueWithLanguages,
    text2: initialValueWithLanguages,
  });
  const [fieldsValues, setFieldsValues] =
    React.useState<IHeaderAdvertisement>(initialData);
  const [chosenAdvertisementName, setChosenAdvertisementName] =
    React.useState<string>('');

  React.useEffect(() => {
    const result = languagesList.map(
      (language: { code: string; value: string }) => {
        return { code: language.code, value: '' };
      }
    );
    setInitialValueWithLanguages(result);
  }, [languagesList]);

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const advertisementByType = await fetchAdvertisementByType('home');
          const languages = await fetchLanguages();
          setLanguagesList(languages);
          setFieldsValues(advertisementByType);
          setInitialData(advertisementByType);
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
      const ukName = fieldsValues.name;
      if (ukName) {
        setChosenAdvertisementName(ukName);
      }
    }
  }, [fieldsValues]);

  const handleClickOpenModal = (variant: string) => {
    if (variant === 'back') {
      setOpenBackModal(true);
    } else if (variant === 'save') {
      setOpenSaveModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenBackModal(false);
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
              name: chosenAdvertisementName ? chosenAdvertisementName : null,
              pageName,
              parentPageName,
            }}
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
            {linkId === 1 && (
              <Basic
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
              />
            )}
            {linkId === 2 && languagesList.length !== 0 && (
              <Data
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
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendAdvertisementData('home', fieldsValues)
              }
            />
          )}
        </>
      )}
    </Box>
  );
};

export default HeaderAdvertisement;
