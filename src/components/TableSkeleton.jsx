// @mui
import { TableRow, TableCell, Skeleton, Stack } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

export default function TableSkeleton({ columns, ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center">
          <Skeleton
            variant="rectangular"
            width={40}
            height={40}
            sx={{ borderRadius: 1, flexShrink: 0 }}
          />

          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
          <Skeleton variant="text" width={90} height={20} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
