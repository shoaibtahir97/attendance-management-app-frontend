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
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFSelect,
} from '../../../components/HookForm';
import useNotification from '../../../hooks/useNotification';
import { useGetTemplateListQuery } from '../../../redux/slices/apiSlices/templateApiSlice';
import { useIssueWarningLettersMutation } from '../../../redux/slices/apiSlices/warningLetterApiSlice';

const warningLettersType = [
  { label: '1st', value: '1st' },
  { label: '2nd', value: '2nd' },
  { label: '3rd', value: '3rd' },
];

const SendWarningLetterDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    dialogTitle,
    studentIds,
    setSelectedRowKeys,
  } = props;
  const { data: templateList, isLoading } = useGetTemplateListQuery();
  const [sendWarningLetter] = useIssueWarningLettersMutation();
  const { openNotification } = useNotification();

  const defaultValues = {
    studentIds,
    warningLetterType: '',
    templateId: '',
  };

  const sendWarningLetterSchema = Yup.object().shape({
    studentIds: Yup.array().of(Yup.string()),
    warningLetterType: Yup.string().required(
      'Type of warning letter is required'
    ),
    templateId: Yup.string().required('Template is required'),
  });

  const methods = useForm({
    resolver: yupResolver(sendWarningLetterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, reset },
  } = methods;

  const closeModal = () => {
    setSelectedRowKeys([]);
    showModalMethod();
  };

  const handleSendWarningLetter = async (data) => {
    await sendWarningLetter({ ...data })
      .unwrap()
      .then((res) => {
        console.log('res', res);
        openNotification('success', res?.message);
      })
      .catch((err) => {
        console.log('err', err);
        openNotification('error', err?.data?.message ?? err?.error);
      });
  };

  return (
    <Dialog open={isShowModal} onClose={closeModal} fullWidth maxWidth="sm">
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
              Send Warning Letter
            </Typography>
            <IconButton onClick={closeModal}>
              <MdClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <RHFSelect
            name="warningLetterType"
            label="Warning Letter Type"
            options={warningLettersType}
          />
          <RHFAutocomplete
            name="templateId"
            label="Template"
            sx={{ width: '100%' }}
            size="small"
            options={templateList}
          />
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
              Send
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

export default SendWarningLetterDialog;
