import { FormHelperText, InputLabel, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
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
      render={({ field, fieldState: { error } }) => {
        return (
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
                field.onChange(date);
              }}
              error={!!error}
              {...other}
              slotProps={{ textField: { size: 'small' } }}
            />
            {error && (
              <FormHelperText error sx={{ textAlign: 'left' }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        );
      }}
    />
  );
};

export default RHFDatePicker;
