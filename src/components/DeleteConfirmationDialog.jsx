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
import { MdClose } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
const DeleteConfirmationDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    dialogTitle,
    deleteEntity,
    deleteWarning,
    deleteLoader,
    handleDelete,
  } = props;
  return (
    <Dialog
      open={isShowModal}
      onClose={showModalMethod}
      fullWidth
      maxWidth={'sm'}
      scroll="body">
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}>
        <Typography id="modal-modal-title" variant="h6">
          {dialogTitle}?
        </Typography>
        <IconButton onClick={showModalMethod}>
          <MdClose />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          {/* <Typography
            variant="body2"
            sx={{ color: 'text.secondary', pt: 1 }}
            align="center">
            {deleteEntity}
          </Typography> */}
          <Typography
            variant="body2"
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
            align="center">
            {deleteWarning}
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid
            item
            md={12}
            xs={12}
            sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              htmlType="submit"
              type="primary"
              loading={deleteLoader}
              onClick={handleDelete}
              iconPosition="start"
              size="middle"
              icon={<MdDelete />}>
              Delete
            </Button>
            <Button
              onClick={() => showModalMethod()}
              size="middle"
              style={{ marginLeft: '10px' }}
              type="default">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
