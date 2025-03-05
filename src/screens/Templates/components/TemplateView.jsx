import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { MdClose } from 'react-icons/md';
import ReactQuill from 'react-quill';

const TemplateView = (props) => {
  const { isShowModal, closeModal, template } = props;
  return (
    <Dialog open={isShowModal} onClose={closeModal} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Typography variant="h6">Template View</Typography>
        <IconButton onClick={closeModal}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ReactQuill value={template} readOnly={true} theme={'bubble'} />
      </DialogContent>
    </Dialog>
  );
};

export default TemplateView;
