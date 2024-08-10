import { Chip } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RHFChipSelect = (props) => {
  const { name, options } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log({ field });
        options.map((option, index) => {
          return <Chip key={index} label={option} onClick={field.onClick} />;
        });
      }}
    />
  );
};

export default RHFChipSelect;
