import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  FormControlLabel,
  InputLabel,
  Switch,
  Typography,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useGlobalContext } from '../../hooks/GlobalContext';
import PagesDataCommon from '../PagesDataCommon';
import Modal from '../../components/Modal';
import StyledField from '../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import DatePicker from '../../components/Inputs/DatePicker';
import { haveSameData, Status, stopInputScroll } from '../../constants';
import Editor from '../../components/Inputs/Editor';
import { IFeedback } from '../../types/feedbackTypes';
import {
  fetchFeedbacksById,
  handleAddFeedback,
  handleDeleteFeedback,
  handleSendFeedbackData,
} from '../../services/feedbackAPI';
import Loader from '../../components/Loader';

interface IFeedbacksDataProps {
  initialLink: string;
  pageName: string;
  parentPageName: string;
}

const FeedbacksData: React.FC<IFeedbacksDataProps> = ({
  initialLink,
  pageName,
  parentPageName,
}) => {
  const { idle, pending, resolved, rejected } = Status;
  const currentDay = new Date().toISOString().slice(0, 10);
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState(idle);
  const [dataWasChanged, setDataWasChanged] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<IFeedback>({
    name: '',
    phone: '',
    email: '',
    publicationDate: currentDay,
    published: false,
    rate: 0,
    comment: '',
  });
  const [fieldsValues, setFieldsValues] =
    React.useState<IFeedback>(initialData);
  const [chosenFeedbackName, setChosenFeedbackName] =
    React.useState<string>('');
  const [isRendered, setIsRendered] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsRendered(true);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const { id } = useParams();

  React.useEffect(() => {
    setDataWasChanged(!haveSameData(initialData, fieldsValues));
  }, [fieldsValues, initialData]);

  React.useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setStatus(pending);
          const feedbackById = await fetchFeedbacksById(id as string);
          setFieldsValues(feedbackById);
          setInitialData(feedbackById);
          setStatus(resolved);
        } catch (error) {
          setStatus(rejected);
        }
      };
      fetchData();
    } else {
      setFieldsValues({
        name: '',
        phone: '',
        email: '',
        publicationDate: currentDay,
        published: false,
        rate: 0,
        comment: '',
      });
    }
  }, [currentDay, id, pending, rejected, resolved]);

  React.useEffect(() => {
    if (fieldsValues) {
      const ukName = fieldsValues.name;
      if (ukName) {
        setChosenFeedbackName(ukName);
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

  const handleFieldsChange = (e: any) => {
    setFieldsValues((prevState: any) => {
      if (e.target.type === 'number') {
        return {
          ...prevState,
          [e.target.id]: Number((e.target as HTMLInputElement).value),
        };
      } else {
        return {
          ...prevState,
          [e.target.id]: (e.target as HTMLInputElement).value,
        };
      }
    });
  };

  const handleCreationDateChange = (
    name: string,
    newValue?: Date | Dayjs | null
  ) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [name]: dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ[Z]').slice(0, 10),
      };
    });
  };

  const handleActiveChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        return {
          ...prevState,
          [key]: (e.target as HTMLInputElement).checked,
        };
      });
    };

  return (
    <Box>
      {status === pending && <Loader />}
      {status !== pending && status !== rejected && (
        <>
          <PagesDataCommon
            handleClickOpenModal={handleClickOpenModal}
            linksData={{
              link: initialLink,
              name: chosenFeedbackName ? chosenFeedbackName : null,
              pageName,
              parentPageName,
            }}
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
            <InputLabel
              htmlFor="name"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Ім'я
              <StyledField
                id="name"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.name ? fieldsValues.name : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>
            <InputLabel
              htmlFor="phone"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Телефон
              <StyledField
                id="phone"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.phone ? fieldsValues.phone : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>
            <InputLabel
              htmlFor="email"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              E-mail
              <StyledField
                id="email"
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={fieldsValues.email ? fieldsValues.email : ''}
                onChange={handleFieldsChange}
              />
            </InputLabel>
            <DatePicker
              noMaxDate
              label="Дата публікації"
              darkTheme={darkTheme}
              value={fieldsValues.publicationDate}
              onChange={(newValue: Date | Dayjs | null) => {
                handleCreationDateChange('publicationDate', newValue);
              }}
            />
            <FormControlLabel
              className={cx(
                classes.formControlLabel,
                darkTheme ? 'dark' : null
              )}
              label="Опубліковано"
              control={
                <Switch
                  checked={fieldsValues.published}
                  onChange={handleActiveChange('published')}
                  inputProps={{ 'aria-label': 'published' }}
                  className={cx(classes.switch, darkTheme ? 'dark' : null)}
                />
              }
            />
            <InputLabel
              htmlFor="rate"
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              Оцінка
              <StyledField
                type="number"
                onWheel={e => {
                  stopInputScroll(e);
                }}
                id="rate"
                variant="outlined"
                sx={{ width: '40%', mt: '16px' }}
                required
                darkTheme={darkTheme}
                value={Number(fieldsValues.rate).toString()}
                onChange={handleFieldsChange}
              />
            </InputLabel>
            <Typography component="h2" className={classes.descriptionText}>
              Відгук
            </Typography>
            {isRendered && (
              <Editor
                debug={false}
                initData={fieldsValues.comment ? fieldsValues.comment : ''}
                onChange={e => {
                  setFieldsValues(prevState => {
                    return { ...prevState, comment: e.editor.getData() };
                  });
                }}
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
              handleDeleteData={() => handleDeleteFeedback(id as string)}
            />
          )}
          {openSaveModal && (
            <Modal
              shouldOpenModal={openSaveModal}
              handleCloseModal={handleCloseModal}
              type={'save'}
              dataToSend={fieldsValues}
              handleEditData={() =>
                handleSendFeedbackData(id as string, fieldsValues)
              }
              handlePostData={() => handleAddFeedback(fieldsValues)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default FeedbacksData;
