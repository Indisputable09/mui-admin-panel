import React from 'react';
import { Box } from '@mui/material';
import { AnalysesCategoryBasic, AnalysesCategorySEO } from './SubLinks';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import PagesDataCommon from '../PagesDataCommon';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { haveSameData, Status } from '../../constants';
import { IAnalysisCategory } from '../../types/analysisCategoryTypes';
import {
  fetchAnalysisCategoryById,
  handleAddAnalysisCategory,
  handleDeleteAnalysisCategory,
  handleSendAnalysesCategoryData,
} from '../../services/analysesCategoriesAPI';
import Loader from '../../components/Loader';

interface IAnalysesCategoriesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const languages = [
  { name: 'Укр', id: 1, code: 'uk' },
  { name: 'Eng', id: 2, code: 'en' },
];

const links = [
  { name: 'категорія', id: 1 },
  { name: 'seo', id: 2 },
];

const AnalysesCategoriesData: React.FC<IAnalysesCategoriesDataProps> = ({
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
  const [initialData, setInitialData] = React.useState<IAnalysisCategory>({
    name: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    url: '',
    sort: 0,
    top: false,
    metaTitle: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
    metaDescription: [
      { code: 'uk', value: '' },
      { code: 'en', value: '' },
    ],
  });

  const { id } = useParams();

  const [fieldsValues, setFieldsValues] =
    React.useState<IAnalysisCategory>(initialData);
  const [chosenAnalysisCategoryName, setChosenAnalysisCategoryName] =
    React.useState<string>('');

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const newsById = await fetchAnalysisCategoryById(id as string);
          setFieldsValues(newsById);
          setInitialData(newsById);
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
      setChosenAnalysisCategoryName(ukName!.value);
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
              name: chosenAnalysisCategoryName
                ? chosenAnalysisCategoryName
                : null,
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
              <AnalysesCategoryBasic
                darkTheme={darkTheme}
                setFieldsValues={setFieldsValues}
                fieldsValues={fieldsValues}
                languages={languages}
              />
            )}
            {linkId === 2 && (
              <AnalysesCategorySEO
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
              handleDeleteData={() =>
                handleDeleteAnalysisCategory(id as string)
              }
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendAnalysesCategoryData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddAnalysisCategory(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default AnalysesCategoriesData;
