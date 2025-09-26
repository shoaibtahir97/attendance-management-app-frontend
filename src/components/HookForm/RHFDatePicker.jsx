import { FormHelperText, InputLabel, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

const RHFDatePicker = (props) => {
  const { name, label, ...other } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              {label}
            </InputLabel>
            <DatePicker
              value={dayjs(field.value) || dayjs(new Date())}
              onChange={(date, event) => {
                console.log('date', date);
                field.onChange(date);
              }}
              error={!!error}
              {...other}
              slotProps={{
                textField: { size: 'small', error: !!error },
                field: { clearable: true },
              }}
            />
          </Stack>
          {error && (
            <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};

export default RHFDatePicker;
