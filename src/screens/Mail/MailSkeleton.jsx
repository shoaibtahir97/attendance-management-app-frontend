import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const MailSkeleton = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <Skeleton variant="text" width="120px" height="40px" />
      <Skeleton variant="text" width="500px" height="80px" />
      <Skeleton variant="text" width="120px" height="40px" />
      <Skeleton variant="text" width="500px" height="80px" />
      <Skeleton variant="text" width="120px" height="40px" />
      <Skeleton variant="text" width="500px" height="300px" />
      <Stack direction="row" spacing={1}>
        <Skeleton variant="text" width="80px" height="40px" />
        <Skeleton variant="text" width="80px" height="40px" />
      </Stack>
    </Stack>
  );
};

export default MailSkeleton;
