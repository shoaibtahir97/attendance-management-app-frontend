import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { Select } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  children,
  onChange,
  label,
  options,
  dense = false,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      as={
        <Select>
          {options?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      }
    />
  );
}
