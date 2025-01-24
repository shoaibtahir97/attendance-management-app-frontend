import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../../components/HookForm';
import useNotification from '../../../hooks/useNotification';
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '../../../redux/slices/apiSlices/notesApiSlice';

const NotesModal = (props) => {
  const {
    isShowModal,
    showModalMethod,
    studentId,
    handleFetchStudentDetails,
    currentNote,
    setCurrentNote,
  } = props;
  console.log({ currentNote });
  const { openNotification } = useNotification();
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const notesSchema = Yup.object().shape({
    note: Yup.string().required('Note is required'),
  });

  const methods = useForm({
    resolver: yupResolver(notesSchema),
    mode: 'onTouched',
    defaultValues: {
      note: currentNote?.note || '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const closeModal = () => {
    showModalMethod();
    reset({ note: '' });
    setCurrentNote(null);
  };

  const onSubmit = async (data) => {
    if (currentNote) {
      await updateNote({ note: data.note, _id: currentNote._id })
        .unwrap()
        .then((res) => {
          closeModal();
          openNotification('success', res?.message);
          handleFetchStudentDetails();
        })
        .catch((err) => {
          openNotification('error', err?.data?.message || err?.error);
        });
    } else {
      await createNote({
        note: data.note,
        studentId,
      })
        .unwrap()
        .then((res) => {
          closeModal();
          openNotification('success', res?.message);
          handleFetchStudentDetails();
        })
        .catch((err) => {
          openNotification('error', err?.data?.message || err?.error);
        });
    }
  };

  useEffect(() => {
    if (currentNote) {
      methods.setValue('note', currentNote?.note);
    }
  }, [currentNote]);

  return (
    <Dialog
      open={isShowModal}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth={true}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant="h6">Add Note</Typography>
        <IconButton onClick={closeModal}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ marginTop: '-20px' }}>
          <RHFTextField
            name="note"
            label="Note"
            multiline
            minRows={4}
            placeholder="Add note here..."
          />
          <div className="mt-3" style={{ textAlign: 'right' }}>
            <Button
              style={{ marginRight: '5px' }}
              type="default"
              onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              variant="contained"
              htmlType="submit"
              loading={isSubmitting}>
              {currentNote ? 'Edit' : 'Submit'}
            </Button>
          </div>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
};

export default NotesModal;
