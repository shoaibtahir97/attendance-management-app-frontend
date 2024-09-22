import { Grid } from '@mui/material';
import { Skeleton } from 'antd';
import React from 'react';

const CalendarSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="text" width={180} height={60} />
        <Skeleton variant="text" width={180} height={60} />
      </Grid>
    </Grid>
  );
};

export default CalendarSkeleton;
