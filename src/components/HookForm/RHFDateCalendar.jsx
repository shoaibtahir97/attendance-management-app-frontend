import { FormControl, FormHelperText } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFDateCalendar = (props) => {
  const { name, label, ...other } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl>
            <DateCalendar
              value={field.value ?? dayjs()}
              onChange={(date, event) => {
                field.onChange(date);
              }}
              label={label}
              error={error ? 'true' : 'false'}
            />
            {error && (
              <FormHelperText error sx={{ textAlign: 'left' }}>
                {error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default RHFDateCalendar;
