import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Basic, Data, SEO } from './SubLinks';
import { haveSameData, Status } from '../../../../constants';
import { IAnalysesAtHomePage } from '../../../../types/pagesTypes';
import { fetchLanguages } from '../../../../services/languagesAPI';
import {
  fetchPageById,
  handleSendAnalysesAtHomePageData,
} from '../../../../services/pagesAPI';
import Loader from '../../../../components/Loader';

interface IAnalysesPagesAnalysesAtHomeProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'seo', id: 3 },
];

export const AnalysesPagesAnalysesAtHome: React.FC<
  IAnalysesPagesAnalysesAtHomeProps
> = ({ initialLink, pageName, parentPageName }) => {
  const { idle, pending, resolved, rejected } = Status;
  const [status, setStatus] = React.useState(idle);
  const { darkTheme } = useGlobalContext();
  const [linkId, setLinkId] = React.useState<number>(1);
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialValueWithLanguages, setInitialValueWithLanguages] =
    React.useState([{ code: 'uk', value: '' }]);
  const [languagesList, setLanguagesList] = React.useState([]);
  const [initialData, setInitialData] = React.useState<IAnalysesAtHomePage>({
    name: '',
    banner: {
      additionalColor: '',
      primaryColor: '',
      primaryText: initialValueWithLanguages,
      additionalText: initialValueWithLanguages,
      image: null,
      imageMobile: null,
      imageDesktop: null,
    },
    faqs: null,
    weekdaysOrdersSchedule: '',
    weekendOrdersSchedule: '',
    weekdaysDrivingSchedule: '',
    weekendDrivingSchedule: '',
    service: {
      image: null,
      title: initialValueWithLanguages,
      text: initialValueWithLanguages,
    },
    steps: [
      {
        image: null,
        title: initialValueWithLanguages,
        text: initialValueWithLanguages,
      },
    ],
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
    indexed: false,
  });

  const [fieldsValues, setFieldsValues] =
    React.useState<IAnalysesAtHomePage>(initialData);

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
          const pageById = await fetchPageById(id as string);
          const languages = await fetchLanguages();
          setLanguagesList(languages);
          setFieldsValues(pageById);
          setInitialData(pageById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    }
  }, [id, pending, rejected, resolved]);

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
              name: fieldsValues.name,
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
            {linkId === 1 && (
              <Basic
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
              />
            )}
            {linkId === 2 && languagesList.length > 0 && (
              <Data
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
              />
            )}
            {linkId === 3 && languagesList.length > 0 && (
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
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendAnalysesAtHomePageData(id as string, fieldsValues)
              }
            />
          )}
        </>
      )}
    </Box>
  );
};
