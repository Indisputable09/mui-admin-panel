import React from 'react';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { IRow } from '../TableComponent/TableComponent';
import SelectActions from '../SelectActions';
import { useToolbarStyles } from './Toolbar.styles';
import { Link } from 'react-router-dom';

interface IToolbarProps {
  handleSelectAllRows: () => void;
  handleUnselectAllRows: () => void;
  handleChangeFilter: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  filter: string;
  selectedRows: IRow[];
  darkTheme: boolean;
  noCheckAll?: boolean;
  noCopy?: boolean;
  noSearchField?: boolean;
  noAddButton?: boolean;
}

interface ISearchFieldProps {
  darkTheme: boolean;
}

const SearchField = styled(TextField, {
  shouldForwardProp: prop =>
    prop !== 'color' &&
    prop !== 'variant' &&
    prop !== 'sx' &&
    prop !== 'darkTheme',
  name: 'SearchField',
  slot: 'Root',
})<ISearchFieldProps>(({ darkTheme }) => {
  return {
    input: {
      color: darkTheme ? '#fff' : '#000',
    },
    '&.dark label.Mui-focused': {
      color: '#ffffff',
    },
    '&.dark label': {
      color: '#ffffff',
    },
    '&.dark .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: darkTheme ? '#fff' : '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: darkTheme ? '#fff' : '#1976d2',
      },
    },
  };
});

const Toolbar: React.FC<IToolbarProps> = ({
  handleSelectAllRows,
  handleUnselectAllRows,
  handleChangeFilter,
  filter,
  selectedRows,
  darkTheme,
  noCheckAll,
  noCopy,
  noSearchField = false,
  noAddButton = false,
}) => {
  const handleAddClick = () => {};

  const { classes, cx } = useToolbarStyles();
  return (
    <Box className={cx(classes.toolbarContainer, darkTheme ? 'dark' : null)}>
      {noSearchField ? null : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchField
            id="search"
            label="Пошук..."
            variant="outlined"
            value={filter}
            onChange={e => handleChangeFilter(e)}
            autoComplete="off"
            darkTheme={darkTheme}
            className={cx(classes.searchField, darkTheme ? 'dark' : null)}
          />
          <SearchIcon />
        </Box>
      )}
      {noAddButton ? null : selectedRows.length > 0 ? (
        <SelectActions
          darkTheme={darkTheme}
          noCheckAll={noCheckAll}
          noCopy={noCopy}
          handleSelectAllRows={handleSelectAllRows}
          handleUnselectAllRows={handleUnselectAllRows}
        />
      ) : (
        <Link to={'add'} style={{ marginLeft: 'auto' }}>
          <Button
            className={cx(classes.addButton, darkTheme ? 'dark' : null)}
            onClick={handleAddClick}
          >
            <AddIcon />
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Toolbar;
