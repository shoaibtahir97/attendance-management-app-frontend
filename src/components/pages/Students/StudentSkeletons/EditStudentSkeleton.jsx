import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const EditStudentSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="text" width={180} height={60} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={'100%'} height={50} />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="text" width={80} height={50} />
      </Grid>
    </Grid>
  );
};

export default EditStudentSkeleton;
