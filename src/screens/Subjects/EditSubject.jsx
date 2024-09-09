import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import Select from 'react-select';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import {
  useGetStudentDetailsQuery,
  useUpdateStudentDetailsMutation,
} from '../../redux/slices/apiSlices/studentApiSlice';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm/index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Button } from 'antd';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import Alert from '../../components/Alert';
import useNotification from '../../hooks/useNotification';
import {
  useGetSubjectDetailsQuery,
  useUpdateSubjectDetailsMutation,
} from '../../redux/slices/apiSlices/subjectApiSlice';

const EditSubject = () => {
  const { openNotification } = useNotification();

  const { id: subjectId } = useParams();

  const { data, isLoading, error } = useGetSubjectDetailsQuery(subjectId);

  const [updateSubjectDetails, { isLoading: loadingUpdate }] =
    useUpdateSubjectDetailsMutation();

  const subjectSchema = Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(subjectSchema),
  });

  const { handleSubmit, reset } = methods;

  const updateSubjectData = async (data) => {
    updateSubjectDetails(data)
      .unwrap()
      .then((res) => openNotification('success', res?.message))
      .catch((err) =>
        openNotification('error', err?.data?.message || err?.error)
      );
  };

  useEffect(() => {
    reset(data);
  }, [data]);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Edit Subject"
        pageTitle="Edit Subject"
        parentRoute={PATH_DASHBOARD.subjects}
        parentSection="Subject"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              {isLoading ? (
                <EditStudentSkeleton />
              ) : error ? (
                <Alert
                  message="Error"
                  type="error"
                  description={error.data?.message}
                />
              ) : (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(updateSubjectData)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">
                        Subject Information
                        {/* <span>
                          <Link to="#">
                            <i className="feather-more-vertical">
                              <FeatherIcon icon="more-vertical" />
                            </i>
                          </Link>
                        </span> */}
                      </h5>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="code" label={'Code'} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="name" label={' Name'} />
                    </Grid>{' '}
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="description" label="Desctipion" />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loadingUpdate}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </FormProvider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubject;
