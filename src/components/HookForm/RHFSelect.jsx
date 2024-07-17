import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Chip, OutlinedInput, TextField } from '@mui/material';
import { Select } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFSelect({
  name,
  children,
  onChange,
  label,
  dense = false,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        let { onChange, ...field_ } = field;
        return (
          <Select
            id='customized-textbox'
            {...field_}
            displayEmpty
            value={field?.value}
            onChange={field?.onChange}
            // input={
            //   <TextField
            //     label={label}
            //     placeholder={label}
            //     error={!!error}
            //     helperText={error?.message}
            //     onChange={(e) => field?.onChange(e)}
            //   />
            // }
            {...other}
          >
            {children}
          </Select>
        );
      }}
    />
  );
}
