import React from 'react';
import {
  Box,
  InputLabel,
  Typography,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Switch,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '../../components/Modal';
import StyledField from '../../components/Inputs/StyledField/StyledField';
import PagesDataCommon from '../PagesDataCommon';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { useGlobalContext } from '../../hooks/GlobalContext';
import { haveSameData, Status } from '../../constants';
import { ILanguage } from '../../types/languageTypes';
import {
  fetchLanguageById,
  handleAddLanguage,
  handleDeleteLanguage,
  handleSendLanguageData,
} from '../../services/languagesAPI';
import Loader from '../../components/Loader';

interface ILanguagesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

interface ICustomizedTooltipProps extends TooltipProps {
  darkTheme: boolean;
}

const CustomizedTooltip = styled(
  ({ className, darkTheme, ...props }: ICustomizedTooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme, darkTheme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: darkTheme ? '#ffffff' : '#1F2A38',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: darkTheme ? '#1F2A38' : '#ffffff',
    color: darkTheme ? '#ffffff' : '#111111',
    border: darkTheme ? '1px solid #ffffff' : '1px solid #111111',
  },
}));

const LanguagesData: React.FC<ILanguagesDataProps> = ({
  pageName,
  initialLink,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<ILanguage>({
    language: '',
    iso: '',
    url: '',
    mainLanguage: false,
    indexed: false,
  });

  const [fieldsValues, setFieldsValues] =
    React.useState<ILanguage>(initialData);
  console.log('fieldsValues:', fieldsValues);
  const [chosenLanguageName, setChosenLanguageName] =
    React.useState<string>('');

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const languageById = await fetchLanguageById(id as string);
          setFieldsValues(languageById);
          setInitialData(languageById);
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
      setChosenLanguageName(fieldsValues.language);
    }
  }, [fieldsValues]);

  const handleLanguagesFieldsChange = (e: React.ChangeEvent) => {
    setFieldsValues((prevState: any) => {
      if (e.target.id === 'iso') {
        return {
          ...prevState,
          [e.target.id]: (e.target as HTMLInputElement).value.toLowerCase(),
        };
      } else {
        return {
          ...prevState,
          [e.target.id]: (e.target as HTMLInputElement).value,
        };
      }
    });
  };

  const handleMainLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        mainLanguage: (e.target as HTMLInputElement).checked,
      };
    });
  };

  const handleIndexedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        indexed: (e.target as HTMLInputElement).checked,
      };
    });
  };

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

  const { classes, cx } = usePagesDataCommonStyles();
  return (
    <Box>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={handleClickOpenModal}
            linksData={{
              link: initialLink,
              name: chosenLanguageName ? chosenLanguageName : null,
              pageName,
              parentPageName,
            }}
            dataWasChanged={dataWasChanged}
          />
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              py: '24px',
            }}
            noValidate
            autoComplete="off"
          >
            <InputLabel
              htmlFor="language"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Назва
              <StyledField
                id="language"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.language}
                onChange={handleLanguagesFieldsChange}
              />
            </InputLabel>
            <InputLabel
              htmlFor="ISO"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Код ISO
                <CustomizedTooltip
                  title="en, uk"
                  placement="right"
                  darkTheme={darkTheme}
                >
                  <InfoIcon sx={{ color: '#27AE60' }} />
                </CustomizedTooltip>
              </Box>
              <StyledField
                id="iso"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.iso}
                onChange={handleLanguagesFieldsChange}
              />
            </InputLabel>
            <InputLabel
              htmlFor="url"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Відображення в URL
              <StyledField
                id="url"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.url}
                onChange={handleLanguagesFieldsChange}
              />
            </InputLabel>
            <Box sx={{ mb: '24px' }}>
              <Typography
                component="p"
                className={cx(
                  classes.mainLanguageText,
                  darkTheme ? 'dark' : null
                )}
              >
                Основна мова
              </Typography>
              <Switch
                checked={fieldsValues.mainLanguage}
                onChange={handleMainLanguageChange}
                inputProps={{ 'aria-label': 'published' }}
                className={cx(classes.switch, darkTheme ? 'dark' : null)}
              />
            </Box>
            <Box sx={{ mb: '24px' }}>
              <Typography
                component="p"
                className={cx(
                  classes.mainLanguageText,
                  darkTheme ? 'dark' : null
                )}
              >
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  Індексований
                  <CustomizedTooltip
                    title="no follow, no index"
                    placement="right"
                    darkTheme={darkTheme}
                  >
                    <InfoIcon sx={{ color: '#27AE60' }} />
                  </CustomizedTooltip>
                </Box>
              </Typography>
              <Switch
                checked={fieldsValues.indexed}
                onChange={handleIndexedChange}
                inputProps={{ 'aria-label': 'published' }}
                className={cx(classes.switch, darkTheme ? 'dark' : null)}
              />
            </Box>
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
              handleDeleteData={() => handleDeleteLanguage(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendLanguageData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddLanguage(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default LanguagesData;
