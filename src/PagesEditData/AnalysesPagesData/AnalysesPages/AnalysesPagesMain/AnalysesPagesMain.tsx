import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Banner, Description, Popular, SEO } from './Sublinks';
import { haveSameData, Status } from '../../../../constants';
import {
  fetchPageById,
  handleSendMainPageData,
} from '../../../../services/pagesAPI';
import { fetchLanguages } from '../../../../services/languagesAPI';
import { fetchAnalysesPackages } from '../../../../services/analysesPackagesAPI';
import { fetchActions } from '../../../../services/actionsAPI';
import { fetchNews } from '../../../../services/newsAPI';
import { fetchAnalyses } from '../../../../services/analysesAPI';
import { IMainPage } from '../../../../types/pagesTypes';
import Loader from '../../../../components/Loader';

interface IAnalysesPagesMainProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

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
  const [initialData, setInitialData] = React.useState<IMainPage>({
    name: '',
    banners: [
      {
        additionalColor: '',
        primaryColor: '',
        image: null,
        imageMobile: null,
        imageDesktop: null,
        primaryText: initialValueWithLanguages,
        additionalText: initialValueWithLanguages,
        url: '',
      },
    ],
    analyses: null,
    complexes: null,
    sales: null,
    news: null,
    title: initialValueWithLanguages,
    description: initialValueWithLanguages,
    texts: [
      {
        name: initialValueWithLanguages,
      },
      {
        name: initialValueWithLanguages,
      },
      {
        name: initialValueWithLanguages,
      },
      {
        name: initialValueWithLanguages,
      },
    ],
    copyright: initialValueWithLanguages,
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
    indexed: false,
  });

  const [fieldsValues, setFieldsValues] =
    React.useState<IMainPage>(initialData);
  const [analyses, setAnalyses] = React.useState<
    { id: number; value: string }[]
  >([]);
  const [complexes, setComplexes] = React.useState<
    { id: number; value: string }[]
  >([]);
  const [sales, setSales] = React.useState<{ id: number; value: string }[]>([]);
  const [news, setNews] = React.useState<{ id: number; value: string }[]>([]);

  React.useEffect(() => {
    const getLists = async () => {
      const analysesList = await fetchAnalyses();
      const complexesList = await fetchAnalysesPackages();
      const salesList = await fetchActions();
      const newsList = await fetchNews();
      setAnalyses(analysesList);
      setComplexes(complexesList);
      setSales(salesList);
      setNews(newsList);
    };
    getLists();
  }, []);

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
          const analysesList = await fetchAnalyses();
          const complexesList = await fetchAnalysesPackages();
          const salesList = await fetchActions();
          const newsList = await fetchNews();
          setAnalyses(analysesList);
          setComplexes(complexesList);
          setSales(salesList);
          setNews(newsList);
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
            {linkId === 1 && languagesList.length !== 0 && (
              <Banner
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
                initialValueWithLanguages={initialValueWithLanguages}
              />
            )}
            {linkId === 2 && (
              <Popular
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                analyses={analyses}
                complexes={complexes}
                sales={sales}
                news={news}
              />
            )}
            {linkId === 3 && languagesList.length !== 0 && (
              <Description
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
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
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendMainPageData(id as string, fieldsValues)
              }
            />
          )}
        </>
      )}
    </Box>
  );
};
