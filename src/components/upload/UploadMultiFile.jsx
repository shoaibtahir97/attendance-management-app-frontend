import { useDropzone } from 'react-dropzone';
import { styled } from '@mui/material/styles';
import { Box, Stack, IconButton, Typography } from '@mui/material';
// type
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  // padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

export default function UploadMultiFile({
  loading,
  error,
  validator,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  handleCloseModal,
  ...other
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    ...other,
  });

  const theme = useTheme();

  const myStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: {
      xs: '80%',
      sm: '80%',
      md: '80%',
      lg: '70%',
    },
    maxWidth: {
      xs: '80%',
      sm: '80%',
      md: '80%',
      lg: '70%',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '32px',
    p: 4,
    margin: 'auto',
  };

  const fileMessage = `a_maximum_of_10_files_are_allowed_in_a_single_upload`;

  return (
    <Box sx={{ ...sx, width: '100%' }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject ?? error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
            // height: "150px",
          }),
          border: 'none',
        }}>
        <input {...getInputProps()} />

        <BlockContent fileName={null} />
      </DropZoneStyle>

      {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

      <MultiFilePreview
        files={files}
        showPreview={showPreview}
        onRemove={onRemove}
        loading={false}
      />

      {files.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            Selected files: {files?.length}
          </Typography>
          {/* <Stack
            direction="row"
            justifyContent="center"
            sx={{ marginTop: '10px' }}
            alignItems="center"
            spacing={1.5}>
            <Box
              sx={{
                textAlign: 'center',
              }}>
              <Button
                style={{
                  textAlign: 'center',
                  marginRight: 2,
                }}
                size="medium"
                type="default"
                onClick={onRemoveAll}>
                Cancel
              </Button>
              <LoadingButton
                loading={loading}
                type="primary"
                onClick={onUpload}>
                Upload
              </LoadingButton>
            </Box>
          </Stack> */}
        </>
      )}

      {helperText && helperText}
    </Box>
  );
}
