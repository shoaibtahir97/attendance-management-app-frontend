import React, { useEffect, useRef, useState } from 'react';
import {
  FormProvider,
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Alert, Button, Tag } from 'antd';
import { useGetUsersListQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { useGetStudentsListQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { Box, Chip, Grid, IconButton, Stack, Typography } from '@mui/material';
import getFileData from '../../utils/getFileData';
import { fData } from '../../utils/formatNumber';
import { IoClose } from 'react-icons/io5';
import { useSendMailMutation } from '../../redux/slices/apiSlices/mailApiSlice';
import useNotification from '../../hooks/useNotification';
const MailScreen = () => {
  const { openNotification } = useNotification();

  const {
    data: teachersList,
    error: teachersError,
    isLoading: loadingTeachers,
  } = useGetUsersListQuery({ role: 'teacher', filter: 'email' });

  const {
    data: studentsList,
    error: studentsError,
    isLoading: loadingStudents,
  } = useGetStudentsListQuery({ filter: 'email' });
  const fileInputRef = useRef(null);

  const [sendMail, { isLoading }] = useSendMailMutation();

  const mailSchema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
    body: Yup.string().required('Body is required'),
    recipients: Yup.array()
      .of(Yup.string().email('Email must be a valid email'))
      .min('1', 'At least one recipient is required'),
    attachment: Yup.mixed(),
  });

  const methods = useForm({
    resolver: yupResolver(mailSchema),
  });

  const {
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const changeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(
        'attachment',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  };

  const attachment = watch('attachment');

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleSendMail = async (data) => {
    await sendMail(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Mail"
        pageTitle="Mail"
        parentRoute={PATH_DASHBOARD.mail}
        parentSection="Mail"
      />
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex justify-content-center my-4">
            {loadingStudents || loadingTeachers ? (
              <>Loading...</>
            ) : studentsError || teachersError ? (
              <Alert
                message="Error"
                type="error"
                style={{ width: '60%' }}
                description={
                  studentsError.data?.message || teachersError.data?.message
                }
              />
            ) : (
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(handleSendMail)}>
                <RHFAutocomplete
                  name="recipients"
                  multiple
                  label="Recipients"
                  options={[...teachersList, ...studentsList]}
                />
                <RHFTextField name="subject" label="Subject" />
                <div className="mb-5">
                  <RHFEditor simple name="body" label="Body" />
                </div>
                {attachment && (
                  <Grid item xs={12} md={12}>
                    <Chip
                      sx={{ my: 1 }}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="#2361CF">
                            {' '}
                            {typeof attachment === 'string'
                              ? attachment
                              : attachment
                                ? getFileData(attachment)?.name
                                : ''}
                          </Typography>
                          <Typography variant="subtitle2">
                            (
                            {typeof attachment === 'string'
                              ? ''
                              : attachment
                                ? fData(getFileData(attachment)?.size || 0)
                                : ''}
                            )
                          </Typography>
                        </Stack>
                      }
                      onDelete={() => setValue('attachment', '')}
                    />
                    {/* <Tag
                      closeIcon={<IoClose />}
                      onClose={() => setValue('attachment', '')}>
                      <Stack direction="row">
                        <Typography variant="subtitle1" color="#2361CF">
                          {' '}
                          {typeof attachment === 'string'
                            ? attachment
                            : attachment
                              ? getFileData(attachment)?.name
                              : ''}
                        </Typography>
                        <Typography variant="subtitle2">
                          (
                          {typeof attachment === 'string'
                            ? ''
                            : attachment
                              ? fData(getFileData(attachment)?.size || 0)
                              : ''}
                          )
                        </Typography>
                      </Stack>
                    </Tag> */}
                    {/* <Box
                        sx={{
                          borderRadius: 0.75,
                          border: `solid 1px black`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: 1,
                          margin: 0.5,
                        }}>
                        <Box
                          sx={{
                            width: 'calc(100% - 30px)',
                          }}>
                          <Typography
                            variant="subtitle1"
                            noWrap
                            sx={{
                              display: 'block',
                              width: 'calc(100% - 30px)',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                            }}>
                            {typeof attachment === 'string'
                              ? attachment
                              : attachment
                                ? getFileData(attachment)?.name
                                : ''}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: 'text.secondary' }}
                            noWrap>
                            {typeof attachment === 'string'
                              ? ''
                              : attachment
                                ? fData(getFileData(attachment)?.size || 0)
                                : ''}
                          </Typography>
                        </Box>

                        <Box>
                          <IconButton
                            edge="end"
                            size="small"
                            onClick={() => setValue('attachment', '')}
                            sx={{
                              width: '30px',
                              height: '30px',
                              textAlign: 'right',
                            }}>
                            <IoClose />
                          </IconButton>
                        </Box>
                      </Box> */}
                  </Grid>
                )}

                <Button htmlType="submit" type="primary" loading={isSubmitting}>
                  Send
                </Button>
                <Button
                  htmlType="button"
                  type="default"
                  disabled={isSubmitting}
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    handleAttach();
                  }}>
                  Attachments
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="attachment"
                  onChange={changeHandler}
                  style={{ display: 'none' }}
                />
              </FormProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailScreen;
