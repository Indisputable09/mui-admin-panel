import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, Divider, InputLabel, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../Modal';
import { optionsRows } from '../../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import Autocomplete from '../../Inputs/Autocomplete';
import StyledField from '../../Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import AttributesTable from '../AttributesData/AttributesTable';

interface IOptionsDataProps {
  initialLink: string;
}

const optionTypes = ['Текст', 'Зображення', 'Колір'];

const OptionsData: React.FC<IOptionsDataProps> = ({ initialLink }) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenOption = optionsRows.find(row => row.id === Number(id));

  const [optionsFieldsValues, setOptionsFieldsValues] = React.useState(
    chosenOption && chosenAction === 'edit'
      ? {
          optionValue: 'value ukr',
          optionValueEng: 'value eng',
          optionType: 'Текст',
          data: [
            {
              id: nanoid(3),
              valueUkr: 'ukr',
              valueEng: 'eng',
              sort: 1,
            },
            {
              id: nanoid(3),
              valueUkr: 'ukr2',
              valueEng: 'eng2',
              sort: 2,
            },
          ],
        }
      : {
          optionValue: '',
          optionValueEng: '',
          optionType: 'Текст',
          data: [
            {
              id: nanoid(3),
              valueUkr: '',
              valueEng: '',
              sort: 0,
            },
          ],
        }
  );
  console.log('optionsFieldsValues', optionsFieldsValues);

  const handleAddOptionsDataClick = () => {
    setOptionsFieldsValues(prevState => {
      return {
        ...prevState,
        data: [
          ...prevState.data,
          {
            id: nanoid(3),
            valueUkr: '',
            valueEng: '',
            sort: 0,
          },
        ],
      };
    });
  };

  const handleOptionsFieldsChange =
    (name?: string) => (e: React.ChangeEvent, newValue?: string | null) => {
      if (name) {
        setOptionsFieldsValues((prevState: any) => {
          return {
            ...prevState,
            [name]: newValue,
          };
        });
      } else {
        setOptionsFieldsValues(prevState => {
          return {
            ...prevState,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        });
      }
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

  return (
    <Box>
      <PagesDataCommon
        chosenRowItem={chosenOption}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link: '/products/options',
          name: chosenOption ? chosenOption.name : null,
          pageName: 'Опції',
        }}
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
          htmlFor="optionValue"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Ім'я опції
          <Box className={cx(classes.inputWithLang)}>
            <StyledField
              id="optionValue"
              variant="outlined"
              sx={{ width: '100%', mt: '16px' }}
              darkTheme={darkTheme}
              value={optionsFieldsValues.optionValue}
              onChange={e => handleOptionsFieldsChange()(e)}
            />
            <Box className={cx(classes.inputLangBlock)}>Укр</Box>
          </Box>
        </InputLabel>
        <InputLabel
          htmlFor="optionValueEng"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          <Box className={cx(classes.inputWithLang)}>
            <StyledField
              id="optionValueEng"
              variant="outlined"
              sx={{ width: '100%', mt: '16px' }}
              darkTheme={darkTheme}
              value={optionsFieldsValues.optionValueEng}
              onChange={e => handleOptionsFieldsChange()(e)}
            />
            <Box className={cx(classes.inputLangBlock)}>Eng</Box>
          </Box>
        </InputLabel>
        <InputLabel
          htmlFor="optionType"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Тип опції
          <Autocomplete
            list={optionTypes}
            id="optionType"
            onChange={handleOptionsFieldsChange('optionType')}
            value={optionsFieldsValues.optionType}
            className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          />
        </InputLabel>
        {optionsFieldsValues.data.length === 0 ? (
          <>
            <Typography component="h2" className={classes.noResultsText}>
              Опції відсутні
            </Typography>
            <Divider
              className={cx(
                classes.pricesBottomDivider,
                darkTheme ? 'dark' : null
              )}
            />
          </>
        ) : (
          <AttributesTable
            fieldsValues={optionsFieldsValues}
            setFieldsValues={setOptionsFieldsValues}
            darkTheme={darkTheme}
            headCells={['Id', 'Значення опції', 'Порядок сортування', '']}
            bodyCells={optionsFieldsValues.data}
          />
        )}
        <Button
          onClick={handleAddOptionsDataClick}
          variant="contained"
          className={cx(classes.addButton, darkTheme ? 'dark' : null)}
        >
          <AddIcon /> Додати
        </Button>
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
        />
      )}
    </Box>
  );
};

export default OptionsData;
