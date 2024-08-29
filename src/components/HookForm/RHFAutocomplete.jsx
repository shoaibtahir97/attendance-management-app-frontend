import { Autocomplete, InputLabel, Stack, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

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
              value={
                value
                  ? (options.find((option) => {
                      return value === option.value;
                    }) ?? null)
                  : null
              }
              onChange={(event, newValue) => {
                if (Array.isArray(newValue))
                  onChange(newValue ? newValue : null);
                else onChange(newValue ? newValue.value : null);
              }}
              size="small"
              multiple={!!multiple}
              freeSolo={!!freeSolo}
              options={options ? options : []}
              getOptionLabel={(option) => {
                return typeof option === 'string' ? option : option.label;
              }}
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
