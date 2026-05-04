import { yupResolver } from '@hookform/resolvers/yup';
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
import { Button } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { useMergeGroups } from './hooks/useMergeGroups';

const mergeGroupsDefaultValues = {
  selectedGroupIds: [],
  name: '',
};

const mergeGroupsSchema = Yup.object().shape({
  selectedGroupIds: Yup.array()
    .of(Yup.string())
    .length(2, 'Please select exactly two groups to merge'),
  name: Yup.string().trim().required('Group name is required'),
});

export const MergeGroupsDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    selectedGroupIds,
    selectedRowNames,
    handleReset,
  } = props;
  const { handleMergeGroups } = useMergeGroups(handleReset);

  const methods = useForm({
    defaultValues: mergeGroupsDefaultValues,
    resolver: yupResolver(mergeGroupsSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const closeModal = () => {
    reset(mergeGroupsDefaultValues);
    handleReset();
  };

  useEffect(() => {
    reset({ ...mergeGroupsDefaultValues, selectedGroupIds });
  }, [reset, selectedGroupIds]);

  return (
    <Dialog open={isShowModal} onClose={closeModal} fullWidth maxWidth="sm">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleMergeGroups)}>
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Typography variant="h6">Merge Groups</Typography>
            <IconButton onClick={closeModal}>
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <Typography>{selectedRowNames[0]}</Typography>
            <FaArrowRight />
            <Typography>{selectedRowNames[1]}</Typography>
          </Stack>
          <RHFTextField name="name" label="New Group Name" />
        </DialogContent>
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mt: 2 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
              size="large">
              Merge
            </Button>
            <Button onClick={closeModal} disabled={isSubmitting} size="large">
              Cancel
            </Button>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
