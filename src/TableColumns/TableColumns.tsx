import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MoreActions from '../components/TableComponents/MoreActions';
import ControlledSwitch from '../components/TableComponents/ControlledSwitch';
import BasicActions from '../components/TableComponents/BasicActions';
import PriceCell from '../components/TableComponents/PriceCell';
import VisibilityAction from '../components/TableComponents/VisibilityAction';
import OrderStatus from '../components/TableComponents/OrderStatus';

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
  },
  {
    field: 'sku',
    headerName: 'Код',
    width: 80,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'price',
    headerName: 'Ціна',
    width: 110,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return (
        <PriceCell price={params.row.price} discount={params.row?.discount} />
      );
    },
  },
  {
    field: 'category',
    headerName: 'Категорія',
    width: 130,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Опубліковано',
    width: 120,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <ControlledSwitch status={params.row.status} />;
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
      return <MoreActions id={params.row.id} />;
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
    renderCell: params => <BasicActions id={params.row.id} />,
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
    renderCell: params => <BasicActions id={params.row.id} />,
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

export const FAQColumns: GridColDef[] = [
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

export const attributesColumns: GridColDef[] = [
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
  },
  {
    field: 'values',
    headerName: 'Значення',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'position',
    headerName: 'Позиція',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    // renderCell: params => {
    //   console.log(
    //     'params ',
    //     params.api.getRowIndex(params.row.name),
    //     params.row.id
    //   );
    //   return <></>;
    // },
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

export const attributesCategoriesColumns: GridColDef[] = [
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
  },
  {
    field: 'position',
    headerName: 'Позиція',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    // renderCell: params => {
    //   console.log(
    //     'params ',
    //     params.api.getRowIndex(params.row.name),
    //     params.row.id
    //   );
    //   return <></>;
    // },
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

export const privacyPolicyColumns: GridColDef[] = [
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

export const clientsColumns: GridColDef[] = [
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
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'surname',
    headerName: 'Прізвище',
    minWidth: 120,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'telephoneNumber',
    headerName: 'Телефон',
    minWidth: 130,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'E-mail',
    minWidth: 190,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'sales',
    headerName: 'Продажі',
    width: 120,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <PriceCell price={params.row.sales} />;
    },
  },
  {
    field: 'active',
    headerName: 'Включено',
    width: 80,
    editable: false,
    renderCell: params => {
      return <ControlledSwitch status={params.row.active} />;
    },
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'registration',
    headerName: 'Реєстрація',
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
    renderCell: params => <BasicActions id={params.row.id} />,
    width: 90,
    headerAlign: 'center',
    align: 'center',
  },
];

export const ordersColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'orderId',
    headerName: 'Номер замовлення',
    minWidth: 100,
    flex: 1,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'delivery',
    headerName: 'Доставка',
    minWidth: 100,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Клієнт',
    minWidth: 100,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'telephoneNumber',
    headerName: 'Телефон',
    minWidth: 150,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'toPay',
    headerName: 'До сплати',
    width: 80,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <PriceCell price={params.row.toPay} />;
    },
  },
  {
    field: 'payment',
    headerName: 'Оплата',
    minWidth: 80,
    editable: false,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'orderStatus',
    headerName: 'Статус замовлення',
    minWidth: 110,
    flex: 1,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => {
      return <OrderStatus text={params.row.orderStatus} />;
    },
  },
  {
    field: 'date',
    headerName: 'Дата',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'pdf',
    headerName: 'Pdf',
    width: 50,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: () => {
      return (
        <IconButton
          sx={{ display: 'flex', justifyContent: 'center', ml: 1 }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="pdf"
        >
          <TextSnippetIcon />
        </IconButton>
      );
    },
  },
  {
    field: 'actions',
    headerName: 'Дії',
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: params => {
      return <VisibilityAction id={params.row.id} />;
    },
    width: 50,
    headerAlign: 'center',
    align: 'center',
  },
];

export const optionsColumns: GridColDef[] = [
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
  },
  {
    field: 'values',
    headerName: 'Значення',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'position',
    headerName: 'Позиція',
    width: 100,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    // renderCell: params => {
    //   console.log(
    //     'params ',
    //     params.api.getRowIndex(params.row.name),
    //     params.row.id
    //   );
    //   return <></>;
    // },
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
