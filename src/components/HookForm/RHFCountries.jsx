import {
  Autocomplete,
  Box,
  CircularProgress,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFCountries = (props) => {
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
              value={options?.find((option) => option.label === value) || null}
              onChange={(event, newValue) => {
                onChange(newValue?.label || null);
              }}
              loading={loading}
              isOptionEqualToValue={(option, value) => option.label === value} // ensures proper comparison
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.label
              }
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={key}
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...optionProps}>
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                );
              }}
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

export default RHFCountries;
