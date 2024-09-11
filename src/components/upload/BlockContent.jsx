// @mui
import { Box, Typography, Stack } from '@mui/material';
// assets
import UploadIllustration from './illustration_upload';

//hooks

import { useTheme } from '@mui/material';
import { Button } from 'antd';

// ----------------------------------------------------------------------

export default function BlockContent({ fileName, fileMessage }) {
  const theme = useTheme();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'column' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}>
      <UploadIllustration sx={{ width: 150 }} />
      <Box sx={{ p: 3 }}>
        {fileName ? (
          fileName
        ) : (
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textAlign: 'center' }}>
            Drop your files here or browse through your machine &nbsp;
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {fileMessage}
          &nbsp;
        </Typography>
        <Box sx={{ textAlign: 'center', padding: '10px' }}>
          <Button
            variant="primary"
            size="large"
            sx={{
              textAlign: 'center',
              backgroundColor: theme.palette.secondary.dark,
              fontSize: '17px',
              minWidth: '120px',
            }}>
            Browse
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
