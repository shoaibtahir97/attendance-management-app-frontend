import React from "react";
import {
  Autocomplete,
  AutocompleteProps,
  Box,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const RHFAutocomplete = (props) => {
  const {
    name,
    options,
    disabled = false,
    placeholder,
    label,
    ...other
  } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              label={label}
              value={
                value
                  ? options.find((option) => {
                      return value === option.value;
                    }) ?? null
                  : null
              }
              sx={{ width: "100%" }}
              fullWidth
              onChange={(event, newValue) => {
                onChange(newValue ? newValue.value : null);
              }}
              getOptionLabel={(option) => option.label}
              options={options}
              error={error?.message?.toString()}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  inputRef={ref}
                  size="small"
                />
              )}
              {...other}
            />

            {error && (
              <FormHelperText error sx={{ textAlign: "left" }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

export default RHFAutocomplete;
