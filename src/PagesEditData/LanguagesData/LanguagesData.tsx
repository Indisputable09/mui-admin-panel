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
import { useLocation, useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '../../components/Modal';
import { languagesRows } from '../../TableRows/TableRows';
import StyledField from '../../components/Inputs/StyledField/StyledField';
import Autocomplete from '../../components/Inputs/Autocomplete';
import PagesDataCommon from '../PagesDataCommon';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { useGlobalContext } from '../../hooks/GlobalContext';

interface ILanguagesDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

interface ICustomizedTooltipProps extends TooltipProps {
  darkTheme: boolean;
}

const icons = ['ukr', 'eng'];

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
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenLanguage = languagesRows.find(row => row.id === Number(id));

  const [fieldsValues, setFieldsValues] = React.useState(
    chosenLanguage && chosenAction === 'edit'
      ? {
          language: chosenLanguage.name,
          ISO: '',
          languageIcon: null,
          url: '',
          mainLanguage: true,
          indexed: false,
        }
      : {
          language: '',
          ISO: '',
          languageIcon: null,
          url: '',
          mainLanguage: true,
          indexed: false,
        }
  );

  const handleLanguagesFieldsChange = (e: React.ChangeEvent) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
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
      <PagesDataCommon
        chosenRowItem={chosenLanguage}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link: initialLink,
          name: chosenLanguage ? chosenLanguage.name : null,
          pageName,
          parentPageName,
        }}
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
            id="ISO"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={fieldsValues.ISO}
            onChange={handleLanguagesFieldsChange}
          />
        </InputLabel>

        <InputLabel
          htmlFor="languageIcon"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Значок
          <Autocomplete
            id="languageIcon"
            value={fieldsValues.languageIcon}
            onChange={(e: any, newValue: string | null) => {
              setFieldsValues((prevState: any) => {
                return {
                  ...prevState,
                  languageIcon: newValue,
                };
              });
            }}
            list={icons}
            className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
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
            className={cx(classes.mainLanguageText, darkTheme ? 'dark' : null)}
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
            className={cx(classes.mainLanguageText, darkTheme ? 'dark' : null)}
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
        />
      )}
      {openDeleteModal && (
        <Modal
          shouldOpenModal={openDeleteModal}
          handleCloseModal={handleCloseModal}
          type={'delete'}
        />
      )}
      {openSaveModal && (
        <Modal
          shouldOpenModal={openSaveModal}
          handleCloseModal={handleCloseModal}
          type={'save'}
          dataToSend={fieldsValues}
        />
      )}
    </Box>
  );
};

export default LanguagesData;
