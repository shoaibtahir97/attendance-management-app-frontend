import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTextField = (props) => {
  const { name, ...other } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
