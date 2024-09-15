import React from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { FormHelperText } from '@mui/material';
// type
import {
  // UploadAvatar,
  // UploadMultiFile,
  UploadSingleFile,
  // UploadProps,
  // UploadMultiFileProps,
} from '../upload';

// ----------------------------------------------------------------------

// export function RHFUploadAvatar({ name, ...other }) {
//   const { control } = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState: { error } }) => {
//         const checkError = !!error && !field.value;

//         return (
//           <div>
//             <UploadAvatar error={checkError} {...other} file={field.value} />
//             {checkError && (
//               <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
//                 {error.message}
//               </FormHelperText>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// }

// ----------------------------------------------------------------------

export function RHFUploadSingleFile({ name, fileName, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && !field.value;

        return (
          <UploadSingleFile
            // accept="image/*"
            file={field.value}
            error={checkError}
            fileName={fileName}
            helperText={
              checkError && (
                <FormHelperText error>{error.message}</FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}

// ----------------------------------------------------------------------

export function RHFUploadMultiFile({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const checkError = !!error && field.value?.length === 0;

        return (
          <UploadMultiFile
            accept="image/*"
            files={field.value}
            error={checkError}
            helperText={
              checkError && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error?.message}
                </FormHelperText>
              )
            }
            {...other}
          />
        );
      }}
    />
  );
}
