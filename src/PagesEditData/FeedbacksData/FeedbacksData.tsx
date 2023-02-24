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
import { feedbacksRows } from '../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import Modal from '../../components/Modal';
import StyledField from '../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import DatePicker from '../../components/Inputs/DatePicker';
import { stopInputScroll } from '../../constants';
import Editor from '../../components/Inputs/Editor';

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
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const chosenFeedback = feedbacksRows.find(row => row.id === Number(id));

  const currentDay = dayjs(new Date().toISOString().slice(0, 10));

  const [fieldsValues, setFieldsValues] = React.useState({
    name: 'name',
    phone: 'phone',
    email: 'email',
    publicationDate: currentDay.toDate(),
    published: true,
    rate: 0,
    feedback: '',
  });

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
        [name]: newValue,
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
      <PagesDataCommon
        chosenRowItem={chosenFeedback}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link: initialLink,
          name: chosenFeedback ? chosenFeedback.name : null,
          pageName,
          parentPageName,
        }}
        visibilityIcon
        noDeleteIcon
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
            value={fieldsValues.name}
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
            value={fieldsValues.phone}
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
            value={fieldsValues.email}
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
          className={cx(classes.formControlLabel, darkTheme ? 'dark' : null)}
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
        <Editor
          debug={false}
          initData={fieldsValues.feedback}
          onChange={e => {
            setFieldsValues(prevState => {
              return { ...prevState, feedback: e.editor.getData() };
            });
          }}
        />
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

export default FeedbacksData;
