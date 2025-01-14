import {
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
  Typography,
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
        <>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: '100%' }}>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              <Typography variant="subtitle2">{label}</Typography>
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
        </>
      )}
    />
  );
};

export default RHFTextField;
