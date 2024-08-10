import { InputLabel, Stack } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTimePicker = (props) => {
  const { name, label, ...others } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}>
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            {label}
          </InputLabel>
          <TimePicker
            value={field.value}
            onChange={(date) => field.onChange(date)}
            error={!!error}
            {...others}
            slotProps={{ textField: { size: 'small' } }}
          />
          {error && (
            <FormHelperText error sx={{ textAlign: 'left' }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  );
};

export default RHFTimePicker;
