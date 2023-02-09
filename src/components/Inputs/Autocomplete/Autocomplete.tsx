import { Autocomplete as MuiAutocomplete } from '@mui/material';
import { useGlobalContext } from '../../../hooks/GlobalContext';
import { StyledCustomPaper } from '../../PagesEditData/AnalysesData/AnalysesData.styles';
import StyledField from '../StyledField';

interface IAutocompleteProps {
  list: string[];
  className?: string;
  id?: string;
  onChange?: (e: any, newValue: string | null) => void;
  value?: string | null;
}

const Autocomplete: React.FC<IAutocompleteProps> = ({
  list,
  className,
  id,
  value,
  onChange,
}) => {
  const { darkTheme } = useGlobalContext();

  return (
    <MuiAutocomplete
      id={id}
      noOptionsText={<p>Відсутні результати</p>}
      options={list}
      className={className}
      value={value}
      onChange={onChange}
      renderInput={params => <StyledField {...params} darkTheme={darkTheme} />}
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

export default Autocomplete;
