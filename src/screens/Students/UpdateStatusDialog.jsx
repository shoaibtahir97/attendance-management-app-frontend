import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';

export const studentStatusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Dropped', value: 'dropped' },
  { label: 'Withdrawn', value: 'withdrawn' },
  { label: 'Graduated', value: 'graduated' },
];

const defaultValues = {
  studentIds: [],
  status: '',
  reason: '',
};

export const UpdateStatusDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    studentIds,
    setSelectedRowKeys,
    handleUpdateStatus,
  } = props;

  const updateStatusSchema = Yup.object().shape({
    studentIds: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one student must be selected'),
    status: Yup.string().required('Status is required'),
    reason: Yup.string().when('status', (status, schema) => {
      const needsReason =
        status === 'inactive' ||
        status === 'suspended' ||
        status === 'dropped' ||
        status === 'withdrawn';
      return needsReason
        ? schema.required('Reason is required for this status')
        : schema.notRequired();
    }),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(updateStatusSchema),
  });

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors },
  } = methods;

  const closeModal = () => {
    reset();
    setSelectedRowKeys([]);
    showModalMethod();
  };

  useEffect(() => {
    reset({ ...defaultValues, studentIds });
  }, [studentIds]);

  return (
    <Dialog open={isShowModal} onClose={closeModal} fullWidth maxWidth="sm">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleUpdateStatus)}>
        <DialogTitle id="scroll-dialog-title">
          {console.log(getValues(), errors)}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              mb: 1,
            }}>
            <Typography variant="h6" sx={{ textAlign: 'left', my: 1 }}>
              Update Student Status
            </Typography>
            <IconButton onClick={closeModal}>
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFAutocomplete
            name="status"
            label="Status"
            sx={{ width: '100%' }}
            size="small"
            options={studentStatusOptions}
          />
          <RHFTextField name="reason" label="Reason" multiline rows={4} />
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
              Update
            </Button>
            <Button
              onClick={closeModal}
              type="outlined"
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
