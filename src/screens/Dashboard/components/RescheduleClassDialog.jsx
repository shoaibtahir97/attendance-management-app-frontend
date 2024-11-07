import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { FormProvider, RHFAutocomplete } from '../../../components/HookForm';
import useNotification from '../../../hooks/useNotification';
import { useAssignCoverTeacherMutation } from '../../../redux/slices/apiSlices/timetableApiSlice';
import { useGetUsersListQuery } from '../../../redux/slices/apiSlices/usersApiSlice';
const RescheduleClassDialog = (props) => {
  const { isShowModal, showModalMethod, classDetails, fetchTodayClasses } =
    props;
  const { data: teachersList, isLoading: loadingTeachers } =
    useGetUsersListQuery({ role: 'teacher' });
  const { openNotification } = useNotification();
  const coverClassSchema = Yup.object().shape({
    coverTeacherId: Yup.string().required('Cover teacher is required'),
  });

  const methods = useForm({
    resolver: yupResolver(coverClassSchema),
  });
  const [assignCoverTeacher] = useAssignCoverTeacherMutation();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const {
    endTime,
    group,
    room,
    startTime,
    subject,
    teacher,
    timetableEntryId,
  } = classDetails;

  const assignCoverClass = async (data) => {
    await assignCoverTeacher({
      ...data,
      timetableEntryId,
      date: new Date(),
      startTime,
      endTime,
    })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        showModalMethod();
        fetchTodayClasses();
      })
      .catch((err) => {
        openNotification('error', err.data.message || err?.error);
      });
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
        <Typography variant="h6">Reschedule</Typography>
        <IconButton disabled={isSubmitting} onClick={showModalMethod}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(assignCoverClass)}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
              my: 1,
            }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Typography variant="body1" fontWeight={'bold'}>
                  Subject:
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  Group:
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  Teacher:
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  Time:
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  Room:
                </Typography>
                <Typography variant="body1" fontWeight={'bold'}>
                  Cover Teacher:
                </Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography variant="body1">{subject}</Typography>
                <Typography variant="body1">{group}</Typography>
                <Typography variant="body1">{`${teacher.firstName} ${teacher.lastName}`}</Typography>
                <Typography variant="body1">
                  {startTime} - {endTime}
                </Typography>
                <Typography variant="body1">{room}</Typography>
                <Box sx={{ width: '320px', mt: '-15px' }}>
                  <RHFAutocomplete
                    name={'coverTeacherId'}
                    options={teachersList?.filter(
                      (coverTeacher) =>
                        coverTeacher.label !==
                        `${teacher.firstName} ${teacher.lastName}`
                    )}
                    loading={loadingTeachers}
                    sx={{ width: '100%' }}
                  />
                </Box>
              </Grid>
            </Grid>
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
              Reschedule
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

export default RescheduleClassDialog;
