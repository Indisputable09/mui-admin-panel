import React from 'react';
import { Autocomplete, Box, Chip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import StyledField from '../StyledField';
import { useMultipleAutocompleteStyles } from './MultipleAutocomplete.styles';
import { StyledCustomPaper } from '../../../PagesEditData/AnalysesData/AnalysesData.styles';

interface IMultipleAutocompleteProps {
  id: string;
  // list: string[] ;
  list: { id: number; value: string }[];
  className?: string;
  darkTheme: boolean;
  onChange: (e: any, values: { id: number; value: string }[]) => void;
  value: string[] | null;
}

const MultipleAutocomplete: React.FC<IMultipleAutocompleteProps> = ({
  id,
  list,
  className,
  darkTheme,
  onChange,
  value,
}) => {
  const { classes, cx } = useMultipleAutocompleteStyles();

  const handleChange = (event: any, values: string[]) => {
    const filteredArray = list.filter(item => values.includes(item.value));
    onChange(event, filteredArray);
  };

  const handleDelete = (e: React.MouseEvent, itemToDelete: string) => {
    e.preventDefault();
    const remainingItems = value!.filter(item => item !== itemToDelete);
    const filteredArray = list.filter(item =>
      remainingItems.includes(item.value)
    );
    onChange(e, filteredArray);
  };

  return (
    <Autocomplete
      multiple
      id={id}
      noOptionsText={<p>Відсутні результати</p>}
      options={list.map(item => item.value)}
      className={className}
      onChange={handleChange}
      value={value ? value : []}
      renderInput={params => (
        <StyledField {...params} variant="outlined" darkTheme={darkTheme} />
      )}
      renderTags={selected => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
      PaperComponent={props => {
        return <StyledCustomPaper {...props} darkTheme={darkTheme} />;
      }}
      ListboxProps={{
        style: {
          maxHeight: '150px',
        },
      }}
    />
  );
};

export default MultipleAutocomplete;
