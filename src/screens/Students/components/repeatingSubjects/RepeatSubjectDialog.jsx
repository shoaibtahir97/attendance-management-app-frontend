import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { FormProvider, RHFAutocomplete } from '../../../../components/HookForm';
import { useGetGroupsListQuery } from '../../../../redux/slices/apiSlices/groupApiSlice';
import { useGetSubjectsListQuery } from '../../../../redux/slices/apiSlices/subjectApiSlice';

const defaultValues = {
  subject: '',
  group: '',
};

const RepeatSubjectDialog = (props) => {
  const { isShowModal, showModalMethod } = props;
  const { data: subjectsList } = useGetSubjectsListQuery();
  const { data: groupsList } = useGetGroupsListQuery();

  const repeatSubjectSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    group: Yup.string().required('Group is required'),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(repeatSubjectSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const closeModal = () => {
    showModalMethod();
    reset(defaultValues);
  };

  const handleSendWarningLetter = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={isShowModal} onClose={closeModal} fullWidth maxWidth="md">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleSendWarningLetter)}>
        <DialogTitle id="scroll-dialog-title">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: 1,
            }}>
            <Typography variant="h6" sx={{ textAlign: 'left', my: 1 }}>
              Failed Subject
            </Typography>
            <IconButton onClick={closeModal}>
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <RHFAutocomplete
                name="subject"
                label="Subject"
                options={subjectsList}
              />
            </Grid>
            <Grid item xs={6}>
              <RHFAutocomplete
                name="group"
                label="Group"
                options={groupsList}
              />
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
              loading={isSubmitting}
              size="large">
              Save
            </Button>
            <Button
              onClick={closeModal}
              type="default"
              size="large"
              disable={isSubmitting}
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
