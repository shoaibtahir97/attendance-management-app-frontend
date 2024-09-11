import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { useUploadBulkStudentsMutation } from '../../../redux/slices/apiSlices/studentApiSlice';
import useNotification from '../../../hooks/useNotification';

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

  const uploadStudentFile = async (data) => {
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
        openNotification('error', err.data.message || err.error);
      });
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open}>
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
            sx={{
              height: '10px',
              width: '8px',
            }}>
            <IoCloseCircleOutline />
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
            accept=".csv"
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}>
            {/* <Typography
              sx={{ display: 'flex', marginTop: 1 }}
              id="modal-modal-title"
              variant="body1">
              {translate('bulk_mapping_first_text')}
              <Tooltip
                title={
                  <>
                    {translate(`sample_csv_info`)}
                    <ul>
                      <li>{translate(`eq_equal`)}</li>
                      <li>{translate(`lk_like`)}</li>
                      <li>{translate(`sw_startsWith`)}</li>
                      <li>{translate(`nsw_notStartsWith`)}</li>
                    </ul>
                  </>
                }
                placement="top"
                sx={{ ml: 1, zIndex: 1 }}>
                <Box>
                  <InfoIcon
                    customColor={theme.palette.action.active}
                    height={24}
                    width={24}
                  />
                </Box>
              </Tooltip>
            </Typography>
            <Typography
              id="modal-modal-description"
              variant="body1"
              sx={{ mt: 2, mb: 2 }}>
              {translate(`bulk_mapping_second_text`)}
            </Typography> */}
            <Box>
              {/* <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={exportSampleCSV}
                startIcon={<DownloadIcon />}>
                {translate(`sample_csv_template`)}
              </Button> */}
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
                style={{ marginLeft: '5px' }}>
                Close
              </Button>
            </Box>
          </Box>
        </FormProvider>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default BulkUploadStudent;
