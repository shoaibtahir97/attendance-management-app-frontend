import {
  Box,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
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
        <Box className="stratford-field">
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: '100%' }}>
            <InputLabel
              variant="outlined"
              htmlFor="uncontrolled-native"
              size="small"
              sx={{ fontSize: '14px' }}>
              {label}
            </InputLabel>
            <TextField
              fullWidth
              error={!!error}
              {...field}
              size="small"
              {...other}
            />
          </Stack>
          {error && (
            <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default RHFTextField;
