import React from 'react';
import { Box } from '@mui/material';
import { Prices, Basic, Data, SEO } from './SubLinks';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { haveSameData, Status } from '../../constants';
import { IAnalysis } from '../../types/analysisTypes';
import {
  fetchAnalysisById,
  handleAddAnalysis,
  handleDeleteAnalysis,
  handleSendAnalysesData,
} from '../../services/analysesAPI';
import Loader from '../../components/Loader';
import { fetchCities } from '../../services/citiesAPI';
import { fetchLanguages } from '../../services/languagesAPI';

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

const AnalysesData: React.FC<IAnalysesDataProps> = ({
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
  const [initialData, setInitialData] = React.useState<IAnalysis>({
    name: initialValueWithLanguages,
    shortDescription: initialValueWithLanguages,
    url: '',
    code: '',
    tabs: [
      {
        name: initialValueWithLanguages,
        description: initialValueWithLanguages,
      },
      {
        name: initialValueWithLanguages,
        description: initialValueWithLanguages,
      },
      {
        name: initialValueWithLanguages,
        description: initialValueWithLanguages,
      },
    ],
    categories: null,
    deadline: initialValueWithLanguages,
    published: false,
    makeAtHome: false,
    prices: [
      {
        city: null,
        price: 0,
        priceWithDiscount: null,
      },
    ],
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
  });
  const [fieldsValues, setFieldsValues] =
    React.useState<IAnalysis>(initialData);
  const [chosenAnalysisName, setChosenAnalysisName] =
    React.useState<string>('');

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
  const [citiesList, setCitiesList] = React.useState([]);

  React.useEffect(() => {
    const getCities = async () => {
      const list = await fetchCities();
      setCitiesList(list);
    };
    getCities();
  }, []);

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const analysisById = await fetchAnalysisById(id as string);
          setFieldsValues(analysisById);
          setInitialData(analysisById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        name: initialValueWithLanguages,
        shortDescription: initialValueWithLanguages,
        url: '',
        code: '',
        tabs: [
          {
            name: initialValueWithLanguages,
            description: initialValueWithLanguages,
          },
          {
            name: initialValueWithLanguages,
            description: initialValueWithLanguages,
          },
          {
            name: initialValueWithLanguages,
            description: initialValueWithLanguages,
          },
        ],
        categories: null,
        deadline: initialValueWithLanguages,
        published: false,
        makeAtHome: false,
        prices: [
          {
            city: null,
            price: 0,
            priceWithDiscount: null,
          },
        ],
        metaTitle: initialValueWithLanguages,
        metaDescription: initialValueWithLanguages,
      });
    }
  }, [id, initialValueWithLanguages, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name.find(item => item.code === 'uk');
      if (ukName) setChosenAnalysisName(ukName!.value);
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
              name: chosenAnalysisName ? chosenAnalysisName : null,
              pageName,
              parentPageName,
            }}
            dataWasChanged={dataWasChanged}
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
            {linkId === 3 && (
              <Prices
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                citiesList={citiesList}
              />
            )}
            {linkId === 4 && languagesList.length !== 0 && (
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
              handleDeleteData={() => handleDeleteAnalysis(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendAnalysesData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddAnalysis(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default AnalysesData;
