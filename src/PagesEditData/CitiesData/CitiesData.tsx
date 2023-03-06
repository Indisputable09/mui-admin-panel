import React from 'react';
import { Box } from '@mui/material';
import { CitiesBasic, CityData } from './SubLinks';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { haveSameData, Status } from '../../constants';
import {
  fetchCityById,
  handleAddCity,
  handleDeleteCity,
  handleSendCityData,
} from '../../services/citiesAPI';
import { ICity } from '../../types/cityTypes';
import Loader from '../../components/Loader';
import { fetchLanguages } from '../../services/languagesAPI';

interface ICitiesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
];

const CitiesData: React.FC<ICitiesDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
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
  const [initialData, setInitialData] = React.useState<ICity>({
    name: initialValueWithLanguages,
    url: '',
    phoneNumbers: [''],
    address: initialValueWithLanguages,
    workingHours: initialValueWithLanguages,
    email: '',
    mapLink: '',
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
  });
  const [fieldsValues, setFieldsValues] = React.useState<ICity>(initialData);
  const [chosenCityName, setChosenCityName] = React.useState<string>('');

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

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const cityById = await fetchCityById(id as string);
          setFieldsValues(cityById);
          setInitialData(cityById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        name: initialValueWithLanguages,
        url: '',
        phoneNumbers: [''],
        address: initialValueWithLanguages,
        workingHours: initialValueWithLanguages,
        email: '',
        mapLink: '',
        metaTitle: initialValueWithLanguages,
        metaDescription: initialValueWithLanguages,
      });
    }
  }, [id, initialValueWithLanguages, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name.find(item => item.code === 'uk');
      if (ukName) {
        setChosenCityName(ukName!.value);
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
              name: chosenCityName ? chosenCityName : null,
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
            {linkId === 1 && languagesList.length !== 0 && (
              <CitiesBasic
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
              />
            )}
            {linkId === 2 && (
              <CityData
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
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
              handleDeleteData={() => handleDeleteCity(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendCityData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddCity(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default CitiesData;
