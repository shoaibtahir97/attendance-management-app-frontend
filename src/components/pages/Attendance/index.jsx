import React from 'react';
import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';
import { Button } from 'antd';
import { Grid, Typography } from '@mui/material';
import { FormProvider, RHFDatePicker } from '../../HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function AttendancePage() {
  const attendanceSchema = Yup.object().shape({
    date: Yup.string().required(),
    course: Yup.string().required(),
    subject: Yup.string().required(),
    group: Yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(attendanceSchema),
  });
  const { handleSubmit } = methods;

  const getStudentList = (data) => {
    console.log(data);
  };

  return (
    <div className='main-wrapper'>
      <Header />
      <SideBar role={'teacher'} />
      <div className='page-wrapper'>
        <div className='content container-fluid'>
          <div className='page-header'>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <h3 className='page-title'>Attendance</h3>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle1'>
                  Course: Diploma in Accounting
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button type='primary' size='small'>
                  Download Exl.
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(getStudentList)}
                >
                  <RHFDatePicker name={'date'} />
                </FormProvider>
              </Grid>
              <Grid item xs={9}></Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
