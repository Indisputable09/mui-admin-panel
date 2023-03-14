import { GridColDef } from '@mui/x-data-grid';
import MoreActions from '../components/TableComponents/MoreActions';
import ControlledSwitch from '../components/TableComponents/ControlledSwitch';
import BasicActions from '../components/TableComponents/BasicActions';
import { handleDeleteNews } from '../services/newsAPI';
import { handleDeleteAnalysis } from '../services/analysesAPI';
import { handleDeleteAnalysisCategory } from '../services/analysesCategoriesAPI';
import { handleDeleteAnalysisPackage } from '../services/analysesPackagesAPI';
import { handleDeleteCity } from '../services/citiesAPI';
import { handleDeleteLanguage } from '../services/languagesAPI';
import { handleDeleteAction } from '../services/actionsAPI';
import { handleDeleteVacancy } from '../services/vacanciesAPI';
import { handleDeleteFAQ } from '../services/faqAPI';
import { handleDeleteFeedback } from '../services/feedbackAPI';
import { Link } from 'react-router-dom';
import React from 'react';
import { useGlobalContext } from '../hooks/GlobalContext';
import { useTableComponentStyles } from '../components/TableComponent/TableComponent.styles';
import { handleDeleteAdmin } from '../services/adminsAPI';

interface ICellLinkProps {
  id: string;
  name: string;
}

interface IDataCell {
  date: string;
}

const CellLink: React.FC<ICellLinkProps> = ({ id, name }) => {
  const { darkTheme } = useGlobalContext();
  const { classes, cx } = useTableComponentStyles();
  return (
    <Link
      to={`${id}/edit`}
      className={cx(classes.cellLink, darkTheme ? 'dark' : null)}
    >
      {name}
    </Link>
  );
};

const DataCell: React.FC<IDataCell> = ({ date }) => {
  const onlyDate = date
    ? date.slice(0, 10).split('-').reverse().join('-')
    : null;
  return <div>{onlyDate}</div>;
};

export const analysesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    minWidth: 250,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'code',
    headerName: 'Код',
    width: 80,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'categories',
    headerName: 'Категорії',
    width: 130,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'published',
    headerName: 'Опубліковано',
    width: 120,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <ControlledSwitch status={params.row.published} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => {
      return (
        <MoreActions
          id={params.row.id}
          handleDeleteData={() => handleDeleteAnalysis(params.row.id)}
        />
      );
    },
    width: 90,
  },
];

export const analysesCategoriesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 700,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'sort',
    headerName: 'Сортування',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteAnalysisCategory(params.row.id)}
      />
    ),
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];

export const analysesPackagesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 700,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'sort',
    headerName: 'Сортування',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteAnalysisPackage(params.row.id)}
      />
    ),
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];

export const analysesPagesColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    sortable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'action',
    headerName: 'Дія',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => <BasicActions id={params.row.id} onlyEdit />,
    width: 120,
  },
];

export const advertisementsColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    sortable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'action',
    headerName: 'Дія',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        onlyEdit
        pagesLinkName={params.row.type}
      />
    ),
    width: 120,
  },
];

export const newsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'image',
    headerName: 'Зображення',
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return (
        <div>
          <img src={params.row.image} alt={params.row.name} width="60" />
        </div>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'published',
    headerName: 'Активна',
    width: 80,
    editable: false,
    renderCell: params => {
      return <ControlledSwitch status={params.row.published} />;
    },
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'publicationDate',
    headerName: 'Дата створення',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <DataCell date={params.row.publicationDate} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => {
      return (
        <BasicActions
          id={params.row.id}
          handleDeleteData={() => handleDeleteNews(params.row.id)}
        />
      );
    },
    width: 120,
  },
];

export const actionsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'image',
    headerName: 'Зображення',
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return (
        <div>
          <img src={params.row.image} alt={params.row.name} width="60" />
        </div>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'published',
    headerName: 'Активна',
    width: 80,
    editable: false,
    renderCell: params => {
      return <ControlledSwitch status={params.row.published} />;
    },
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'finishDate',
    headerName: 'Дата закінчення',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <DataCell date={params.row.finishDate} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteAction(params.row.id)}
      />
    ),
    width: 120,
  },
];

export const feedbacksColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'published',
    headerName: 'Активна',
    width: 80,
    editable: false,
    renderCell: params => {
      return <ControlledSwitch status={params.row.published} />;
    },
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'publicationDate',
    headerName: 'Дата',
    width: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <DataCell date={params.row.publicationDate} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteFeedback(params.row.id)}
      />
    ),
    width: 120,
  },
];

export const languagesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteLanguage(params.row.id)}
      />
    ),
    width: 120,
  },
];

export const FAQColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'question',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.question} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteFAQ(params.row.id)}
      />
    ),
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];

export const vacanciesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteVacancy(params.row.id)}
      />
    ),
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];

export const usersColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: "Ім'я",
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteAdmin(params.row.id)}
      />
    ),
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];

export const citiesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => (
      <BasicActions
        id={params.row.id}
        handleDeleteData={() => handleDeleteCity(params.row.id)}
      />
    ),
    width: 120,
  },
];

export const manufacturersColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'image',
    headerName: 'Зображення',
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return (
        <div>
          <img src={params.row.image} alt={params.row.name} width="60" />
        </div>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Назва',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.name} />;
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    disableColumnMenu: true,
    renderCell: params => <BasicActions id={params.row.id} />,
    width: 120,
  },
];

export const redirectsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'from',
    headerName: 'Від',
    width: 910,
    flex: 1,
    editable: false,
    renderCell: params => {
      return <CellLink id={params.row.id} name={params.row.from} />;
    },
  },
  {
    field: 'to',
    headerName: 'Куди',
    width: 910,
    flex: 1,
    editable: false,
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => <BasicActions id={params.row.id} />,
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
];
