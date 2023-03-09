import { makeStyles } from 'tss-react/mui';

export const useTableComponentStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    cellLink: {
      fontWeight: 400,
      color: '#000000DE',
      transition: 'all 250ms ease-out',
      '&.dark': {
        fontWeight: 400,
        color: '#F2F2F2',
      },
      '&:hover, &:focus': {
        fontWeight: 500,
        textDecoration: 'underline',
      },
    },
    tableToolbarBlock: {
      width: '100%',
      transition: 'all 250ms ease-out',
      boxShadow:
        '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)',
      '&.dark': {
        boxShadow:
          '0px 2px 1px -1px rgba(255, 255, 255, 0.2), 0px 1px 1px rgba(255, 255, 255, 0.14), 0px 1px 3px rgba(255, 255, 255, 0.12)',
      },
    },
    dataGrid: {
      border: 'none',
      borderTop: 'none',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
      transition: 'all 250ms ease-out',
      fontSize: '16px',
      '&.dark div.MuiDataGrid-cell': {
        fontWeight: 500,
        color: '#ffffff',
      },
      '&.dark div[data-field="name"]': { fontWeight: 400, color: '#F2F2F2' },
      '& div[data-field="price"] > div': {
        whiteSpace: 'nowrap',
      },
      '& div.MuiDataGrid-cell': {
        fontSize: '16px',
        fontWeight: 500,
        color: '#000000DE',
      },
      '& div[data-field="name"]': {
        fontWeight: 400,
        color: '#000000DE',
      },
      '& .MuiCheckbox-colorPrimary:not(.Mui-checked)': {
        color: '#000000',
        opacity: '0.6',
      },
      '&.dark .MuiCheckbox-colorPrimary:not(.Mui-checked)': {
        color: '#ffffff',
        opacity: '0.7',
      },
      '&.dark .MuiDataGrid-cell': {
        transition: 'all 250ms ease-out',
        borderBottom: 'none',
      },
      '&.dark .MuiDataGrid-columnHeaders': {
        transition: 'all 250ms ease-out',
        borderBottom: 'none',
      },
      '&.dark .MuiDataGrid-footerContainer': {
        transition: 'all 250ms ease-out',
        borderTop: 'none',
      },
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
        background: 'lightGrey',
        '&:hover': { background: 'grey' },
        borderRadius: '100vw',
      },
      '&.dark': {
        color: '#fff',
        transition: 'all 250ms ease-out',
      },
      '&.dark button': {
        color: '#fff',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiTablePagination-selectLabel': {
        color: '#ffffff',
        opacity: '0.7',
        transition: 'all 250ms ease-out',
      },
      '& .MuiTablePagination-selectLabel': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#000000',
        opacity: '0.6',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiTablePagination-select': {
        color: '#ffffff',
        opacity: '0.7',
        transition: 'all 250ms ease-out',
      },
      '& .MuiTablePagination-select': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#000000',
        opacity: '0.6',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiTablePagination-displayedRows': {
        color: '#ffffff',
        opacity: '0.7',
        transition: 'all 250ms ease-out',
      },
      '& .MuiTablePagination-displayedRows': {
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#000000',
        opacity: '0.6',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiSelect-icon': {
        color: '#ffffff',
        opacity: '0.7',
        transition: 'all 250ms ease-out',
      },
      '& .MuiSelect-icon': {
        color: '#000000',
        opacity: '0.6',
        transition: 'all 250ms ease-out',
      },
      '&.dark .MuiTablePagination-actions': {
        color: '#ffffff',
        opacity: '0.7',
        transition: 'all 250ms ease-out',
      },
      '& .MuiTablePagination-actions': {
        color: '#000000',
        opacity: '0.6',
        transition: 'all 250ms ease-out',
      },
      '& .MuiPaper-root': {
        backgroundColor: 'green',
      },
    },
    dataGridMenu: {
      transition: 'all 250ms ease-out',
      '&.dark': {
        backgroundColor: '#1F2A38',
        color: '#fff',
      },
    },
    checkbox: {
      color: 'inherit',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#90CAF9',
        transition: 'all 250ms ease-out',
      },
    },
    moreActionsMenu: {
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 250ms ease-out',
      '&.dark ul': {
        backgroundColor: '#1F2A38',
        color: '#fff',
      },
    },
    cellExpand: {
      padding: 5,
      '&.dark': {
        backgroundColor: '#1F2A38',
        color: '#fff',
      },
    },
    moreIconButton: {
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 250ms ease-out',
      borderRadius: '4px',
      '&:hover, &:focus': {
        backgroundColor: '#0000000A',
      },
      '&.dark:hover, &.dark:focus': {
        backgroundColor: '#90CAF914',
      },
    },
  })
);
