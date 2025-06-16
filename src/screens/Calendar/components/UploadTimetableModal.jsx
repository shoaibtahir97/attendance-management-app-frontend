import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose, MdDownload } from 'react-icons/md';
import * as XLSX from 'xlsx';
import * as Yup from 'yup';
import { FormProvider } from '../../../components/HookForm';
import { RHFUploadSingleFile } from '../../../components/HookForm/RHFUpload';
import useNotification from '../../../hooks/useNotification';
import { useUploadTimetableMutation } from '../../../redux/slices/apiSlices/timetableApiSlice';

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

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

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
        reset();
        setFileName('');
      });
  };

  const exportSampleCSV = () => {
    const headers = [
      'group',
      'dayOfWeek',
      'teacher',
      'subject',
      'startTime',
      'endTime',
      'room',
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
        <Typography variant="h6">Upload Timetable</Typography>
        <IconButton disabled={isSubmitting} onClick={showModalMethod}>
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
            accept={['.xlsx']}
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
              loading={isSubmitting}
              size="large">
              Upload
            </Button>
            <Button
              onClick={showModalMethod}
              type="default"
              size="large"
              disable={isSubmitting}
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
