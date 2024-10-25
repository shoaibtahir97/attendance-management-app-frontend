// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Switch, InputLabel, Box, FormControlLabel } from '@mui/material';
import { Stack } from 'react-bootstrap';

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, label, disabled, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
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
            label={label}
          />
          {error && (
            <FormHelperText error sx={{ textAlign: 'left', ml: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
