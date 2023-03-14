import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Banner, Description, Gallery, SEO } from './SubLinks';
import { haveSameData, Status } from '../../../../constants';
import { IAboutLaboratoryPage } from '../../../../types/pagesTypes';
import {
  fetchPageById,
  handleSendAboutLaboratoryPageData,
} from '../../../../services/pagesAPI';
import { fetchLanguages } from '../../../../services/languagesAPI';
import Loader from '../../../../components/Loader';

interface IAnalysesPagesAboutLaboratoryProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'банер', id: 1 },
  { name: 'опис', id: 2 },
  { name: 'галерея', id: 3 },
  { name: 'seo', id: 4 },
];

const AnalysesPagesAboutLaboratory: React.FC<
  IAnalysesPagesAboutLaboratoryProps
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
  const [initialData, setInitialData] = React.useState<IAboutLaboratoryPage>({
    banner: {
      image: null,
      imageMobile: null,
      imageDesktop: null,
      primaryText: initialValueWithLanguages,
      additionalText: initialValueWithLanguages,
      additionalColor: '',
      primaryColor: '',
    },
    aboutImage: null,
    title: initialValueWithLanguages,
    description: initialValueWithLanguages,
    blocks: [
      {
        value: 0,
        text: initialValueWithLanguages,
      },
      {
        value: 0,
        text: initialValueWithLanguages,
      },
      {
        value: 0,
        text: initialValueWithLanguages,
      },
    ],
    bottomText: initialValueWithLanguages,
    mission: initialValueWithLanguages,
    values: [
      {
        text: initialValueWithLanguages,
      },
      {
        text: initialValueWithLanguages,
      },
      {
        text: initialValueWithLanguages,
      },
      {
        text: initialValueWithLanguages,
      },
    ],
    slider: [''],
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
    indexed: false,
    name: '',
  });

  const [fieldsValues, setFieldsValues] =
    React.useState<IAboutLaboratoryPage>(initialData);

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
          console.log('pageById:', pageById);
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
              <Banner
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
              />
            )}
            {linkId === 2 && languagesList.length !== 0 && (
              <Description
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languagesList}
              />
            )}
            {linkId === 3 && (
              <Gallery
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
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
                handleSendAboutLaboratoryPageData(id as string, fieldsValues)
              }
            />
          )}
        </>
      )}
    </Box>
  );
};

export default AnalysesPagesAboutLaboratory;
