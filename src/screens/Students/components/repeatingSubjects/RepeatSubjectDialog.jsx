import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { FormProvider, RHFAutocomplete } from '../../../../components/HookForm';
import useNotification from '../../../../hooks/useNotification';
import { useGetGroupsListQuery } from '../../../../redux/slices/apiSlices/groupApiSlice';
import { useStudentFailedSubjectsMutation } from '../../../../redux/slices/apiSlices/studentApiSlice';
import { useGetSubjectsListQuery } from '../../../../redux/slices/apiSlices/subjectApiSlice';
import { getFormattedDateTime } from '../../../../utils/formatDateTime';

const RepeatSubjectDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    studentId,
    editRepeatSubject,
    handleFetchStudentDetails,
  } = props;
  const defaultValues = {
    studentId: studentId ?? '',
    group: editRepeatSubject?.group ?? '',
    subject: editRepeatSubject?.subject ?? '',
    repeatSubjectId: editRepeatSubject?._id ?? '',
  };
  const { openNotification } = useNotification();
  const { data: subjectsList, isLoading: isLoadingSubjectsList } =
    useGetSubjectsListQuery();
  const { data: groupsList, isLoading: isLoadingGroupsList } =
    useGetGroupsListQuery();
  const isLoadingList = isLoadingGroupsList || isLoadingSubjectsList;
  const [repeatSubject, { isLoading }] = useStudentFailedSubjectsMutation();

  const repeatSubjectSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    group: Yup.string().required('Group is required'),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(repeatSubjectSchema),
  });

  const { handleSubmit, reset } = methods;

  const closeModal = () => {
    showModalMethod();
    reset(defaultValues);
  };

  const handleAddRepeatSubject = async (data) => {
    repeatSubject(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        handleFetchStudentDetails();
        closeModal();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <Dialog open={isShowModal} onClose={closeModal} fullWidth maxWidth="md">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleAddRepeatSubject)}>
        <DialogTitle id="scroll-dialog-title">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: 1,
            }}>
            {isLoadingList ? (
              <Skeleton variant="text" width={170} height={80} />
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'left', my: 1 }}>
                Failed Subject
              </Typography>
            )}
            <IconButton onClick={closeModal}>
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {isLoadingList ? (
                <Skeleton variant="text" height={50} width={230} />
              ) : (
                editRepeatSubject && (
                  <Typography variant="body2">
                    Last updated on{' '}
                    {getFormattedDateTime(editRepeatSubject.lastUpdated)}
                  </Typography>
                )
              )}
            </Grid>
            <Grid item xs={6}>
              {isLoadingList ? (
                <Skeleton variant="text" height={90} width={400} />
              ) : (
                <RHFAutocomplete
                  name="subject"
                  label="Subject"
                  options={subjectsList}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {isLoadingList ? (
                <Skeleton variant="text" height={90} width={400} />
              ) : (
                <RHFAutocomplete
                  name="group"
                  label="Group"
                  options={groupsList}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 2 }}>
            <Button
              variant="contained"
              htmlType="submit"
              type="primary"
              loading={isLoading}
              size="middle">
              Save
            </Button>
            <Button
              onClick={closeModal}
              type="default"
              size="middle"
              disable={isLoading}
              style={{ marginLeft: '5px' }}>
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default RepeatSubjectDialog;
