import { Autocomplete, InputLabel, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

// interface Options {
//   label: string;
//   value: any;
// }

// interface RHFAutocompleteProps {
//   name: string;
//   options?: Options[] | null;
//   multiple?: boolean;
//   freeSolo?: boolean;
//   label?: string;
// }

const RHFAutocomplete = (props) => {
  const { name, multiple, freeSolo, options, label, ...other } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        return (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              {label}
            </InputLabel>
            <Autocomplete
              value={value === null ? [] : value}
              onChange={(event, newValue) => {
                if (Array.isArray(newValue))
                  onChange(newValue ? newValue : null);
                else onChange(newValue ? newValue.value : null);
              }}
              size="small"
              multiple={!!multiple}
              freeSolo={!!freeSolo}
              options={options ? options : []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                />
              )}
              {...other}
            />
          </Stack>
        );
      }}
    />
  );
};

export default RHFAutocomplete;
