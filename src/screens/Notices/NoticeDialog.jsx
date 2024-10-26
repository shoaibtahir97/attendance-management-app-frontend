import React, { useEffect } from 'react';
import {
  FormProvider,
  RHFCheckbox,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFTimePicker,
} from '../../components/HookForm';
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
import { MdClose } from 'react-icons/md';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import {
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
} from '../../redux/slices/apiSlices/noticesApiSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useNotification from '../../hooks/useNotification';

const defaultValues = {
  title: '',
  description: '',
  date: dayjs(),
  isActive: true,
};

const NoticeDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    currentNotice = defaultValues,
    setCurrentNotice,
    fetchNotices,
  } = props;
  const [createNotice, { isLoading: createNoticeLoading }] =
    useCreateNoticeMutation();
  const [updateNotice, { isLoading: updateNoticeLoading }] =
    useUpdateNoticeMutation();
  const { openNotification } = useNotification();

  const closeModal = () => {
    reset(defaultValues);
    showModalMethod();
    setCurrentNotice(null);
  };

  const addNoticeSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    date: Yup.date().required('Start date is required'),
    isActive: Yup.boolean(),
  });

  const methods = useForm({
    defaultValues: {
      title: currentNotice?.title,
      description: currentNotice?.description,
      isActive: currentNotice?.isActive,
      date: currentNotice?.date,
    },
    resolver: yupResolver(addNoticeSchema),
  });

  const { handleSubmit, reset } = methods;

  const addEvent = async (data) => {
    const { title, description, date, isActive } = data;
    if (currentNotice) {
      await updateNotice({
        title,
        description,
        date,
        isActive,
        id: currentNotice?._id,
      })
        .unwrap()
        .then((res) => {
          openNotification('success', res?.message);
          fetchNotices({
            page: 1,
            recordsPerPage: 10,
          });
          closeModal();
        })
        .catch((err) => {
          openNotification('error', err.data?.message || err.error);
        });
    } else {
      await createNotice({ title, description, date, isActive })
        .unwrap()
        .then((res) => {
          openNotification('success', res?.message);
          closeModal();
          fetchNotices({
            page: 1,
            recordsPerPage: 10,
          });
        })
        .catch((err) => {
          openNotification('error', err.data?.message || err.error);
        });
    }
  };

  return (
    <Dialog open={isShowModal} onClose={closeModal} maxWidth="sm" fullWidth>
      <FormProvider methods={methods} onSubmit={handleSubmit(addEvent)}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant="h6">Add Notice</Typography>
          <IconButton onClick={closeModal}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" alignItems="flex-start" spacing={1}>
            <RHFTextField
              name="title"
              size="small"
              variant="outlined"
              label="Title"
            />
            <RHFTextField
              name="description"
              size="small"
              label={'Description'}
              multiline
              maxRows={2}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}>
              <RHFDatePicker name="date" label="Date" width="100%" />
            </Stack>
            <Stack>
              <RHFSwitch name="isActive" label="Status" />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: 2, display: 'flex' }}>
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>

            <Box sx={{ ml: 1 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={createNoticeLoading || updateNoticeLoading}>
                {currentNotice ? 'Update' : 'Create'}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default NoticeDialog;
