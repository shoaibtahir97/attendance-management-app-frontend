import { FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
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
          <>
            <DatePicker
              value={field.value}
              onChange={(date, event) => {
                field.onChange(date);
              }}
              label={label}
              error={!!error}
            />
            {error && (
              <FormHelperText error sx={{ textAlign: 'left' }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default RHFDatePicker;
