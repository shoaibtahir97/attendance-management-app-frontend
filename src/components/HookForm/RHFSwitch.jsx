// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { FormControlLabel, InputLabel, Stack, Switch } from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, label, disabled, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{ width: '100%' }}>
            <InputLabel variant="outlined" htmlFor="uncontrolled-native">
              {label}
            </InputLabel>
            <FormControlLabel
              control={
                <Switch
                  disabled={disabled}
                  checked={field.value}
                  onChange={field.onChange}
                  {...field}
                  size="small"
                />
              }
            />
            {error && (
              <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        </>
      )}
    />
  );
}
