import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import PagesDataCommon from '../../../PagesDataCommon';
import Modal from '../../../../components/Modal';
import { useGlobalContext } from '../../../../hooks/GlobalContext';
import { Basic, SEO, Data } from './SubLinks';
import { haveSameData, Status } from '../../../../constants';
import { ICoworkingPage } from '../../../../types/pagesTypes';
import {
  fetchPageById,
  handleSendCoworkingPageData,
} from '../../../../services/pagesAPI';
import { fetchLanguages } from '../../../../services/languagesAPI';
import Loader from '../../../../components/Loader';

interface IAnalysesPagesCoworkingProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const links = [
  { name: 'загальне', id: 1 },
  { name: 'дані', id: 2 },
  { name: 'seo', id: 3 },
];

export const AnalysesPagesCoworking: React.FC<IAnalysesPagesCoworkingProps> = ({
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
  const [initialData, setInitialData] = React.useState<ICoworkingPage>({
    banner: {
      additionalColor: '',
      primaryColor: '',
      primaryText: initialValueWithLanguages,
      additionalText: initialValueWithLanguages,
      imageMobile: null,
      imageDesktop: null,
    },
    title: initialValueWithLanguages,
    description: initialValueWithLanguages,
    metaTitle: initialValueWithLanguages,
    metaDescription: initialValueWithLanguages,
    indexed: false,
    name: '',
  });

  const [fieldsValues, setFieldsValues] =
    React.useState<ICoworkingPage>(initialData);

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
            {linkId === 1 && languagesList.length !== 0 && (
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
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendCoworkingPageData(id as string, fieldsValues)
              }
            />
          )}
        </>
      )}
    </Box>
  );
};
