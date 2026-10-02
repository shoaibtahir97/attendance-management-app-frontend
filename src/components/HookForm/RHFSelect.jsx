import React from 'react';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  children,
  label,
  options,
  onChange: customOnChange,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleChange = (event) => {
          field.onChange(event);
          if (customOnChange) {
            customOnChange(event);
          }
        };

        return (
          <Box className="stratford-field">
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={2}
              sx={{ width: '100%' }}>
              <InputLabel
                variant="outlined"
                sx={{ fontSize: '14px' }}
                htmlFor="uncontrolled-native">
                {label}
              </InputLabel>
              <Select
                fullWidth
                error={!!error}
                size="small"
                value={field?.value || ''}
                {...field}
                onChange={(event) => handleChange(event)}
                {...other}>
                {options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            {error && (
              <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        );
      }}
      {...other}
    />
  );
}
