import React, { useEffect } from 'react';
import {
  FormProvider,
  RHFCheckbox,
  RHFDatePicker,
  RHFSelect,
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
import { getDay } from 'date-fns';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

const NoticeDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    currentEvent,
    setEvents,
    events: createdEvents,
  } = props;

  const repeat = [
    { value: '', label: 'Does not repeat' },
    { value: '', label: 'Daily' },
    { value: '', label: `Weekly on ${getDay(currentEvent?.startStr)}` },
    { value: '', label: 'Every weekday' },
  ];

  const closeModal = () => {
    showModalMethod();
    reset({}, { keepValues: false });
  };

  const defaultValues = {
    title: '',
    description: '',
    start: dayjs(currentEvent?.startStr),
    startTime: dayjs(currentEvent?.start),
    endTime: dayjs(currentEvent?.end),
    allDay: currentEvent?.allDay,
    repeat: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit, reset, getValues } = methods;
  const eventType = watch('eventType');

  const addEvent = (data) => {
    console.log('data', data);
    const newEvent = {
      id: (Math.random() + 1).toString(36).substring(2),
      start: data.startTime.$d, // Use the formatted start date
      end: data.endTime.$d, // Use the formatted end date
      title: data.title,
      allDay: data.allDay,
    };

    setEvents([...createdEvents, newEvent]);
    localStorage.setItem(
      'events',
      JSON.stringify([...createdEvents, { ...newEvent }])
    );
    closeModal();
  };

  useEffect(() => {
    if (currentEvent) {
      const newDefaultValues = {
        title: currentEvent.title || '',
        description: currentEvent.description || '',
        start: dayjs(currentEvent.startStr),
        startTime: dayjs(currentEvent.start),
        endTime: dayjs(currentEvent.end),
        allDay: currentEvent.allDay || false,
        repeat: currentEvent.repeat || '',
      };
      reset(newDefaultValues);
    }
  }, [currentEvent, reset]);

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
              <RHFDatePicker name="start" label="Date" />
              <RHFTimePicker name="startTime" label="Start time" />
              <RHFTimePicker name="endTime" label="End time" />
            </Stack>

            <RHFCheckbox name="allDay" label="All day" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box sx={{ mr: 2, display: 'flex' }}>
            <Button type="default" onClick={closeModal}>
              Cancel
            </Button>

            <Box sx={{ ml: 1 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default NoticeDialog;
