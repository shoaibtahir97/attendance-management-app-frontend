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
import React, { useState, useCallback } from 'react';
import { FormProvider } from '../../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { RHFUploadSingleFile } from '../../../components/HookForm/RHFUpload';
import * as Yup from 'yup';
import { Button } from 'antd';
import * as XLSX from 'xlsx';
import { useUploadBulkStudentsMutation } from '../../../redux/slices/apiSlices/studentApiSlice';
import useNotification from '../../../hooks/useNotification';
import { MdClose, MdDownload } from 'react-icons/md';

const BulkUploadStudent = (props) => {
  const { open, handleClose, fetchStudents } = props;
  const { openNotification } = useNotification();
  const [fileName, setFileName] = useState('');
  const [uploadBulkStudents, { isLoading: loadingUploadBulkStudents }] =
    useUploadBulkStudentsMutation();

  const CSVFileSchema = Yup.object().shape({
    studentsFile: Yup.mixed().required(),
  });

  const methods = useForm({
    resolver: yupResolver(CSVFileSchema),
  });

  const { setValue, reset, handleSubmit, formState } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file) {
        setValue(
          'studentsFile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const exportSampleCSV = () => {
    const headers = [
      'Student ID',
      'First name',
      'Last name',
      'DOB',
      'Phone',
      'Email',
      'Nationality',
      'Group',
      'Course',
      'Cohort Date',
      'Year',
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers]);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SampleSheet');

    // Generate binary string data for the Excel file
    const binaryString = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'binary',
    });

    // Convert the binary string to an ArrayBuffer
    const buffer = new ArrayBuffer(binaryString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryString.length; i++) {
      view[i] = binaryString.charCodeAt(i) & 0xff;
    }

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([buffer], { type: 'application/octet-stream' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor tag for downloading
    const a = document.createElement('a');

    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = 'sample.xlsx';

    // Trigger the download by clicking the anchor tag
    a.click();

    // Clean up the URL after download
    URL.revokeObjectURL(url);
  };

  const uploadStudentFile = async (data) => {
    console.log('data', data);
    await uploadBulkStudents(data.studentsFile)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        fetchStudents({
          page: 1,
          recordsPerPage: 10,
        });
        handleClose();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} scroll="body">
      <DialogTitle id="scroll-dialog-title">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            mb: 1,
          }}>
          <Typography variant="h6" sx={{ textAlign: 'left', my: 1 }}>
            Upload excel for bulk student registration
          </Typography>
          <IconButton
            onClick={handleClose}
            disabled={loadingUploadBulkStudents}>
            <MdClose />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(uploadStudentFile)}>
          <RHFUploadSingleFile
            name="studentsFile"
            onDrop={handleDrop}
            fileName={fileName}
            accept={['.csv']}
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
              Download sample Excel template for uploading student data
            </Typography>

            <Button
              type="default"
              style={{ marginTop: '10px' }}
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
            sx={{ mt: 2 }}>
            <Button
              variant="contained"
              htmlType="submit"
              type="primary"
              loading={loadingUploadBulkStudents}
              size="large">
              Upload
            </Button>
            <Button
              onClick={handleClose}
              type="default"
              size="large"
              style={{ marginLeft: '5px' }}
              disabled={loadingUploadBulkStudents}>
              Cancel
            </Button>
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default BulkUploadStudent;
