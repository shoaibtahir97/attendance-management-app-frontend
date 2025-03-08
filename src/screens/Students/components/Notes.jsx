import { IconButton } from '@mui/material';
import { Button, Card, Empty, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDelete } from 'react-icons/md';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import useNotification from '../../../hooks/useNotification';
import { useDeleteNoteMutation } from '../../../redux/slices/apiSlices/notesApiSlice';
import NotesModal from './NotesModal';

const Notes = (props) => {
  const { notes, studentId, handleFetchStudentDetails } = props;
  const [deleteNote, { isLoading }] = useDeleteNoteMutation();
  const { openNotification } = useNotification();
  const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  const handleToggleNotesModal = (note) => {
    setCurrentNote(note);
    setIsNotesModalVisible(!isNotesModalVisible);
  };

  const handleShowDeleteNoteModal = (note) => {
    setCurrentNote(note);
    openDeleteConfirmationDialog();
  };

  const openDeleteConfirmationDialog = () => {
    setIsDeleteConfirmDialogOpen(!isDeleteConfirmDialogOpen);
  };

  const handleDeleteNote = async () => {
    await deleteNote(currentNote?._id)
      .unwrap()
      .then((res) => {
        openDeleteConfirmationDialog();
        handleFetchStudentDetails();
        openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div className="student-personals-grp" style={{ marginTop: '5px' }}>
      <NotesModal
        studentId={studentId}
        isShowModal={isNotesModalVisible}
        showModalMethod={() => handleToggleNotesModal(null)}
        handleFetchStudentDetails={handleFetchStudentDetails}
        currentNote={currentNote}
        setCurrentNote={setCurrentNote}
      />
      {isDeleteConfirmDialogOpen && currentNote && (
        <DeleteConfirmationDialog
          isShowModal={isDeleteConfirmDialogOpen}
          showModalMethod={openDeleteConfirmationDialog}
          dialogTitle="Delete Note"
          deleteWarning="Are you sure you want to delete the note?, once deleted, it cannot be undone."
          deleteLoader={isLoading}
          handleDelete={handleDeleteNote}
        />
      )}
      <div className="card mb-0">
        <div className="card-body">
          <div className="hello-park">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <h5>Notes</h5>
              <Button
                // loading={isIssuingWarningLetter}
                onClick={() => handleToggleNotesModal(null)}
                // disabled={data?.numOfWarningLettersIssued?.length === 3}
                type="primary">
                Add Note
              </Button>
            </div>
            <div
              style={{
                overflow: 'auto',
                maxHeight: '300px',
                padding: '10px',
              }}>
              {notes?.length > 0 ? (
                notes?.map((note) => (
                  <div
                    key={note._id}
                    style={{ marginTop: '10px' }}
                    className="educate-year">
                    <Card
                      actions={[
                        <Tooltip title="Edit" size="small">
                          <IconButton
                            onClick={() => handleToggleNotesModal(note)}>
                            <FiEdit size="18px" color="primary" />
                          </IconButton>
                        </Tooltip>,
                        <Tooltip title="Delete" size="small">
                          <IconButton
                            onClick={() => handleShowDeleteNoteModal(note)}>
                            <MdOutlineDelete size="20px" />
                          </IconButton>
                        </Tooltip>,
                      ]}
                      style={{ minWidth: 300 }}>
                      <Card.Meta
                        title={note?.note}
                        description={
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}>
                            <div>
                              <p>
                                <b>Last Updated</b>:{' '}
                                {dayjs(note?.createAt).format('DD-MM-YYYY')}
                              </p>
                              <p>
                                <b>Created By</b>:{' '}
                                {`${note.createdBy.firstName} ${note.createdBy.lastName}`}
                              </p>
                            </div>
                            {note.noteAttachment && (
                              <div>
                                <Button
                                  variant="link"
                                  onClick={() =>
                                    window.open(note?.noteAttachment)
                                  }>
                                  View Attachment
                                </Button>
                              </div>
                            )}
                          </div>
                        }
                      />
                    </Card>
                  </div>
                ))
              ) : (
                <Empty />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
