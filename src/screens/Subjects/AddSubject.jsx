import React from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { Grid } from '@mui/material';
import useNotification from '../../hooks/useNotification';
import PageHeader from '../../components/PageHeader';
import { useAddSubjectMutation } from '../../redux/slices/apiSlices/subjectApiSlice';

const AddSubject = () => {
  const { openNotification } = useNotification();

  const [addSubject, { isLoading: loadingAddSubject }] =
    useAddSubjectMutation();

  const subjectSchema = Yup.object().shape({
    code: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(subjectSchema),
  });

  const { handleSubmit, reset } = methods;

  const addSubjectData = async (data) => {
    addSubject(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        reset({
          code: '',
          name: '',
          description: '',
        });
      })
      .catch((err) => openNotification('error', err.data.message || err.error));
  };

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="Add Subject"
        pageTitle="Add Subject"
        parentRoute={PATH_DASHBOARD.subjects}
        parentSection="Subject"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card comman-shadow">
            <div className="card-body">
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(addSubjectData)}>
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
                  <Grid item xs={12} sm={3}>
                    <RHFTextField name="code" label={'Code'} />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <RHFTextField name="name" label={'Name'} />
                  </Grid>{' '}
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name="description" label="Description" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadingAddSubject}>
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
