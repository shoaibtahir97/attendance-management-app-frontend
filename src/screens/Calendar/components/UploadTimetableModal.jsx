import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { FormProvider } from '../../../components/HookForm';
import { RHFUploadSingleFile } from '../../../components/HookForm/RHFUpload';
import { Button } from 'antd';
import useNotification from '../../../hooks/useNotification';
import { useUploadTimetableMutation } from '../../../redux/slices/apiSlices/timetableApiSlice';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const UploadTimetableModal = (props) => {
  const { showModalMethod, isShowModal, fetchAllTimeTables } = props;
  const { openNotification } = useNotification();
  const [fileName, setFileName] = useState('');

  const [uploadTimetable, { loading: loadingUploadTimetable }] =
    useUploadTimetableMutation();

  const timetableSchema = Yup.object().shape({
    timetableFile: Yup.mixed().required('File is required'),
  });

  const methods = useForm({
    resolver: yupResolver(timetableSchema),
    defaultValues: {
      timetableFile: null,
    },
  });
  const { setValue, handleSubmit } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file) {
        setValue(
          'timetableFile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const uploadTimeTable = async (data) => {
    await uploadTimetable(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        fetchAllTimeTables();
        showModalMethod();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message);
      });
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={showModalMethod}
      fullWidth
      maxWidth="md">
      <DialogTitle>Upload Timetable</DialogTitle>
      <DialogContent>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(uploadTimeTable)}>
          <RHFUploadSingleFile
            name="timetableFile"
            onDrop={handleDrop}
            fileName={fileName}
            accept=".csv"
          />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center">
            <Button
              variant="contained"
              htmlType="submit"
              type="primary"
              loading={loadingUploadTimetable}
              size="large">
              Upload
            </Button>
            <Button
              onClick={showModalMethod}
              type="default"
              size="large"
              style={{ marginLeft: '5px' }}>
              Close
            </Button>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UploadTimetableModal;
