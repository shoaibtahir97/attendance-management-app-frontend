import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
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
import { MdClose } from 'react-icons/md';
import { MdDownload } from 'react-icons/md';

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

  const exportSampleCSV = () => {
    // const headers = [
    //   'group',
    //   'dayOfWeek',
    //   'teacher',
    //   'subject',
    //   'startTime',
    //   'endTime',
    // ];

    let csv = 'group,dayOfWeek,teacher,subject,startTime,endTime\n';

    // csvTableFields.forEach((field) => {
    //   csv += field.join(',');
    //   csv += '\n';
    // });

    const blob = new Blob([csv], { type: 'text/xlsx' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor tag for downloading
    const a = document.createElement('a');

    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'timetable.xlsx';

    // Trigger the download by clicking the anchor tag
    a.click();
  };

  return (
    <Dialog
      open={isShowModal}
      onClose={showModalMethod}
      fullWidth
      maxWidth="md">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant="subtitle1">Upload Timetable</Typography>
        <IconButton onClick={showModalMethod}>
          <MdClose />
        </IconButton>
      </DialogTitle>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              my: 1,
            }}>
            <Typography
              sx={{ display: 'flex', marginTop: 1 }}
              id="modal-modal-title"
              variant="body1">
              Download sample Excel template for uploading timetable
            </Typography>

            <Button
              type="default"
              style={{ mr: 1 }}
              onClick={exportSampleCSV}
              icon={<MdDownload />}>
              Sample Excel template
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 3 }}>
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
