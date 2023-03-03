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
  fetchCities,
  handleAddAnalysis,
  handleDeleteAnalysis,
  handleSendAnalysesData,
} from '../../services/analysesAPI';
import Loader from '../../components/Loader';

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
  const { idle, pending, resolved, rejected } = Status;
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<IAnalysis>({
    name: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    url: '',
    code: '',
    tabs: [
      {
        name: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
        description: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
      },
      {
        name: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
        description: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
      },
      {
        name: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
        description: [
          { code: 'uk', value: '' },
          { code: 'en', value: '' },
        ],
      },
    ],
    categories: null,
    deadline: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    published: false,
    makeAtHome: false,
    prices: [
      {
        city: null,
        price: 0,
        priceWithDiscount: null,
      },
    ],
    metaTitle: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    metaDescription: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
  });
  const [fieldsValues, setFieldsValues] =
    React.useState<IAnalysis>(initialData);
  const [chosenAnalysisName, setChosenAnalysisName] =
    React.useState<string>('');

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
    }
  }, [id, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name.find(item => item.code === 'uk');
      setChosenAnalysisName(ukName!.value);
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
                citiesList={citiesList}
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
