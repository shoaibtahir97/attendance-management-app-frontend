import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Box, InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import { Select } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  children,
  onChange,
  label,
  options,
  ...other
}) {
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
          <Select
            fullWidth
            value={field.value || ''}
            onChange={field.onChange}
            error={!!error}
            size="small"
            {...other}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText error sx={{ textAlign: 'left' }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
      {...other}
    />
  );
}
