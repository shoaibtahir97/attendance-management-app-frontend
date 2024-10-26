import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControlLabelProps,
  Stack,
  FormHelperText,
  Box,
} from '@mui/material';

// ----------------------------------------------------------------------

// interface RHFCheckboxProps extends Omit<FormControlLabelProps, 'control'> {
//   name: string;
// }

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Stack direction="column">
              <Box>
                <Checkbox {...field} checked={field?.value} />
              </Box>
              <Box>
                {error && (
                  <Box>
                    <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
                      {error.message}
                    </FormHelperText>
                  </Box>
                )}
              </Box>
            </Stack>
          )}
        />
      }
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

// interface RHFMultiCheckboxProps
//   extends Omit<FormControlLabelProps, 'control' | 'label'> {
//   name: string;
//   options: {
//     label: string,
//     value: any,
//   }[];
// }

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) =>
          field?.value?.includes(option)
            ? field?.value?.filter((value) => value !== option)
            : [...field?.value, option];

        return (
          <FormGroup>
            {options &&
              options.length > 0 &&
              options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={field?.value?.includes(option?.value)}
                      onChange={() =>
                        field?.onChange(onSelected(option?.value))
                      }
                    />
                  }
                  label={option?.label}
                  {...other}
                />
              ))}
          </FormGroup>
        );
      }}
    />
  );
}
