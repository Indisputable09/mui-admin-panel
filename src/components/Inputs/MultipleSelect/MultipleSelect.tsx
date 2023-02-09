import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMultipleSelectStyles } from './MultipleSelect.styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface IMultipleSelectProps {
  list: string[];
  darkTheme: boolean;
  id: string;
  handleMultipleSelectChange: (id: string, newValue: Array<string>) => void;
  value: string[];
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelect: React.FC<IMultipleSelectProps> = ({
  list,
  darkTheme,
  id,
  handleMultipleSelectChange,
  value,
}) => {
  const theme = useTheme();
  const [selectedListItems, setSelectedListItems] = React.useState<string[]>(
    []
  );

  const handleChange = (event: SelectChangeEvent<typeof selectedListItems>) => {
    const {
      target: { value },
    } = event;
    handleMultipleSelectChange(id, value as string[]);
  };

  const handleDelete = (e: React.MouseEvent, itemToDelete: string) => {
    e.preventDefault();
    const remainingItems = value.filter(item => item !== itemToDelete);
    handleMultipleSelectChange(id, remainingItems);
  };

  const handleDeleteAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedListItems([]);
    handleMultipleSelectChange(id, []);
  };

  const { classes, cx } = useMultipleSelectStyles();

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <Select
          sx={{ mt: '16px' }}
          id="multiple-chip"
          multiple
          // value={selectedListItems}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id={id} />}
          className={cx(classes.selectInput, darkTheme ? 'dark' : null)}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <IconButton
                onClick={handleDeleteAll}
                className={cx(
                  classes.cancelAllChipsButton,
                  darkTheme ? 'dark' : null
                )}
              >
                <CancelIcon onMouseDown={event => event.stopPropagation()} />
              </IconButton>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  className={cx(classes.chip, darkTheme ? 'dark' : null)}
                  deleteIcon={
                    <CancelIcon
                      className={cx(
                        classes.cancelChipIcon,
                        darkTheme ? 'dark' : null
                      )}
                      onMouseDown={event => event.stopPropagation()}
                    />
                  }
                  onDelete={e => {
                    handleDelete(e, value);
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={{
            classes: {
              paper: cx(classes.selectMenu, darkTheme ? 'dark' : null),
            },
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 2.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          }}
        >
          {list.map(item => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, selectedListItems, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;
