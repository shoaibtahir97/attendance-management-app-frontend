import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/HookForm';
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

  const { openNotification } = useNotification();
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [fileName, setFileName] = useState('');

  const notesSchema = Yup.object().shape({
    note: Yup.string().required('Note is required'),
    noteAttachment: Yup.mixed(),
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
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;

  const closeModal = () => {
    reset({ note: '', noteAttachment: null });
    showModalMethod();
    setCurrentNote(null);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      if (file) {
        setValue(
          'noteAttachment',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    if (currentNote) {
      await updateNote({ _id: currentNote._id, ...data })
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
        studentId,
        ...data,
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
      setValue('note', currentNote?.note);
      setValue('noteAttachment', currentNote?.noteAttachment);
    }
  }, [currentNote]);

  return (
    <Dialog
      open={isShowModal}
      onClose={closeModal}
      maxWidth="md"
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
          <RHFUploadSingleFile
            name="noteAttachment"
            label="Attachment"
            onDrop={handleDrop}
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
