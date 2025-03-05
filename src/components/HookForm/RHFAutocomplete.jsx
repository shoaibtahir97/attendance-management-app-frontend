import {
  Autocomplete,
  CircularProgress,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFAutocomplete = (props) => {
  const { name, multiple, freeSolo, options, label, loading, ...other } = props;
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
            spacing={2}
            sx={{ width: '100%' }}>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              {label}
            </InputLabel>
            <Autocomplete
              multiple={!!multiple}
              freeSolo={!!freeSolo}
              options={options || []}
              value={
                freeSolo
                  ? value
                  : multiple
                    ? options?.filter((option) =>
                        value?.includes(option.value)
                      ) || []
                    : options?.find((option) => option.value === value) ||
                      value ||
                      ''
              }
              onChange={(event, newValue) => {
                if (multiple) {
                  const selectedValues =
                    newValue?.map((option) =>
                      typeof option === 'string' ? option : option.value
                    ) || [];
                  onChange(selectedValues);
                } else {
                  onChange(
                    typeof newValue === 'string'
                      ? newValue
                      : newValue?.value || ''
                  );
                }
              }}
              loading={loading}
              isOptionEqualToValue={(option, value) => option.value === value}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.label
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              size="small"
              sx={{ width: '100%' }}
              {...other}
            />
          </Stack>
        );
      }}
    />
  );
};

export default RHFAutocomplete;
