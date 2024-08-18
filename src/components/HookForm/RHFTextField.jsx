import { InputLabel, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFTextField = (props) => {
  const { name, label, ...other } = props;
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
          spacing={2}
          sx={{ width: '100%' }}>
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            {label}
          </InputLabel>
          <TextField
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...field}
            size="small"
            {...other}
          />
        </Stack>
      )}
    />
  );
};

export default RHFTextField;
