// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText, InputLabel, Stack } from '@mui/material';
//
import Editor from '../editor';

// ----------------------------------------------------------------------

export default function RHFEditor({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          sx={{ width: '100%' }}>
          <InputLabel variant="outlined" htmlFor="uncontrolled-native">
            {label}
          </InputLabel>
          <Editor
            id={name}
            value={field.value}
            onChange={field.onChange}
            error={!!error}
            helperText={
              <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
                {error?.message}
              </FormHelperText>
            }
            {...other}
          />
        </Stack>
      )}
    />
  );
}
