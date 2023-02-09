import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Button, Divider, InputLabel, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Modal from '../../Modal';
import { attributesRows } from '../../../TableRows/TableRows';
import PagesDataCommon from '../PagesDataCommon';
import Autocomplete from '../../Inputs/Autocomplete';
import StyledField from '../../Inputs/StyledField';
import { usePagesDataCommonStyles } from '../PagesDataCommon/PagesDataCommon.styles';
import { nanoid } from 'nanoid';
import AttributesTable from './AttributesTable';
import { useGlobalContext } from '../../../hooks/GlobalContext';

interface IAttributesDataProps {
  initialLink: string;
}

const attributesList = [
  'attribute 1',
  'attribute 2',
  'attribute 3',
  'attribute 4',
  'attribute 5',
  'attribute 6',
  'attribute 7',
  'attribute 8',
  'attribute 9',
  'attribute 10',
  'attribute 11',
  'attribute 12',
  'attribute 13',
  'attribute 14',
  'attribute 15',
  'attribute 16',
  'attribute 17',
  'attribute 18',
];

const attributesTypes = ['Текст', 'Зображення', 'Колір'];

const AttributesData: React.FC<IAttributesDataProps> = ({ initialLink }) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const { darkTheme } = useGlobalContext();
  const [openBackModal, setOpenBackModal] = React.useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = React.useState<boolean>(false);

  const { id } = useParams();
  const location = useLocation();
  const activePath = location.pathname.split('/');
  const chosenAction = activePath[activePath.length - 1];
  const chosenAttribute = attributesRows.find(row => row.id === Number(id));

  const [attributesFieldsValues, setAttributesFieldsValues] = React.useState(
    chosenAttribute && chosenAction === 'edit'
      ? {
          attributeGroup: chosenAttribute.name,
          attributeValue: 'value ukr',
          attributeValueEng: 'value eng',
          attributeType: 'Текст',
          data: [
            {
              id: nanoid(3),
              valueUkr: 'ukr',
              valueEng: 'eng',
              sort: 1,
              attributeColor: '#111111',
              attributeImg: null,
            },
            {
              id: nanoid(3),
              valueUkr: 'ukr2',
              valueEng: 'eng2',
              sort: 2,
              attributeColor: '#ffffff',
              attributeImg: null,
            },
          ],
        }
      : {
          attributeGroup: null,
          attributeValue: '',
          attributeValueEng: '',
          attributeType: 'Текст',
          data: [
            {
              id: nanoid(3),
              valueUkr: '',
              valueEng: '',
              sort: 0,
              attributeColor: '#ffffff',
              attributeImg: null,
            },
          ],
        }
  );

  const handleAttributesFieldsChange = (e: React.ChangeEvent) => {
    setAttributesFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  const handleAddAttributesDataClick = () => {
    setAttributesFieldsValues(prevState => {
      return {
        ...prevState,
        data: [
          ...prevState.data,
          {
            id: nanoid(3),
            valueUkr: '',
            valueEng: '',
            sort: 0,
            attributeColor: '#ffffff',
            attributeImg: null,
          },
        ],
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

  return (
    <Box>
      <PagesDataCommon
        chosenRowItem={chosenAttribute}
        handleClickOpenModal={handleClickOpenModal}
        linksData={{
          link: '/products/attributes',
          name: chosenAttribute ? chosenAttribute.name : null,
          pageName: 'Атрибути',
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
          htmlFor="attributeValue"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Ім'я атрибута
          <Box className={cx(classes.inputWithLang)}>
            <StyledField
              id="attributeValue"
              variant="outlined"
              sx={{ width: '100%', mt: '16px' }}
              darkTheme={darkTheme}
              value={attributesFieldsValues.attributeValue}
              onChange={handleAttributesFieldsChange}
            />
            <Box className={cx(classes.inputLangBlock)}>Укр</Box>
          </Box>
        </InputLabel>
        <InputLabel
          htmlFor="attributeValueEng"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          <Box className={cx(classes.inputWithLang)}>
            <StyledField
              id="attributeValueEng"
              variant="outlined"
              sx={{ width: '100%', mt: '16px' }}
              darkTheme={darkTheme}
              value={attributesFieldsValues.attributeValueEng}
              onChange={handleAttributesFieldsChange}
            />
            <Box className={cx(classes.inputLangBlock)}>Eng</Box>
          </Box>
        </InputLabel>
        <InputLabel
          htmlFor="attributeGroup"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          <div>
            Група атрибута
            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
          </div>
          <Autocomplete
            list={attributesList}
            id="attributeGroup"
            onChange={(e: any, newValue: string | null) => {
              setAttributesFieldsValues((prevState: any) => {
                return {
                  ...prevState,
                  attributeGroup: newValue,
                };
              });
            }}
            value={attributesFieldsValues.attributeGroup}
            className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          />
        </InputLabel>
        <InputLabel
          htmlFor="attributeType"
          className={cx(classes.label, darkTheme ? 'dark' : null)}
        >
          Тип атрибута
          <Autocomplete
            list={attributesTypes}
            id="attributeType"
            onChange={(e: any, newValue: string | null) => {
              setAttributesFieldsValues((prevState: any) => {
                return {
                  ...prevState,
                  attributeType: newValue,
                };
              });
            }}
            value={attributesFieldsValues.attributeType}
            className={cx(classes.autocomplete, darkTheme ? 'dark' : null)}
          />
        </InputLabel>
        {attributesFieldsValues.data.length === 0 ? (
          <>
            <Typography component="h2" className={classes.noResultsText}>
              Атрибути відсутні
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
            fieldsValues={attributesFieldsValues}
            setFieldsValues={setAttributesFieldsValues}
            darkTheme={darkTheme}
            headCells={['Id', 'Значення атрибута', 'Порядок сортування', '']}
            bodyCells={attributesFieldsValues.data}
          />
        )}
        <Button
          onClick={handleAddAttributesDataClick}
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

export default AttributesData;
