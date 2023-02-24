import React from 'react';
import { InputLabel } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as ViewsDatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/uk';
import StyledField from '../StyledField';
import { usePagesDataCommonStyles } from '../../../PagesEditData/PagesDataCommon/PagesDataCommon.styles';

interface IDatePickerProps {
  darkTheme: boolean;
  noLabel?: boolean;
  label: string;
  noMaxDate?: boolean;
  className?: any;
  value?: Date | Dayjs | null;
  onChange: (
    newValue: Date | Dayjs | null,
    keyboardInputValue?: string | undefined
  ) => void;
}

const DatePicker: React.FC<IDatePickerProps> = ({
  darkTheme,
  label,
  noLabel = false,
  noMaxDate = false,
  className,
  value,
  onChange,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'uk'}>
      <Stack spacing={3}>
        <ViewsDatePicker
          maxDate={noMaxDate ? null : new Date()}
          views={['day']}
          value={dayjs(value)}
          onChange={newValue => onChange(newValue)}
          renderInput={params =>
            noLabel ? (
              <StyledField
                {...params}
                helperText={null}
                sx={{ width: '40%', mt: '16px' }}
                darkTheme={darkTheme}
                className={
                  className ??
                  cx(classes.datePickerField, darkTheme ? 'dark' : null)
                }
              />
            ) : (
              <InputLabel
                className={cx(classes.noMarginLabel, darkTheme ? 'dark' : null)}
              >
                {label}
                <StyledField
                  {...params}
                  helperText={null}
                  sx={{ width: '40%', mt: '16px' }}
                  darkTheme={darkTheme}
                  className={cx(
                    classes.datePickerField,
                    darkTheme ? 'dark' : null
                  )}
                />
              </InputLabel>
            )
          }
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DatePicker;
