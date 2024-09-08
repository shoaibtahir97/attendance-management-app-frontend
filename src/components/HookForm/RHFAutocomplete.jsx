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
        const { onChange } = field;

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
              // value={
              //   multiple
              //     ? value || []
              //     : (options?.find((option) => option.value === value) ?? null)
              // }
              onChange={(event, newValue) => {
                if (multiple) {
                  const selectedValues = newValue?.map(
                    (option) => option.value
                  );
                  onChange(selectedValues);
                } else {
                  onChange(newValue ? newValue.value : null);
                }
              }}
              size="small"
              multiple={!!multiple}
              freeSolo={!!freeSolo}
              options={options ? options : []}
              loading={loading}
              // getOptionLabel={(option) => {
              //   return typeof option === 'string' ? option : option.label;
              // }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    },
                  }}
                />
              )}
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
