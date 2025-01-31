import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button } from 'antd';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import {
  useGetTemplateDetailsQuery,
  useUpdateTemplateDetailsMutation,
} from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';

const EditTemplate = () => {
  const { openNotification } = useNotification();

  const { id: templateId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTemplateDetailsQuery(templateId);

  const [updateTemplate] = useUpdateTemplateDetailsMutation();

  const templateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    content: Yup.string().required('Content is required'),
    variables: Yup.array().of(Yup.string().required('Variable is required')),
  });

  const defaultValues = {
    name: '',
    content: '',
    variables: [],
    isActive: true,
  };

  const methods = useForm({
    resolver: yupResolver(templateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleUpdateTemplate = async (data) => {
    await updateTemplate(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        openNotification('error', err?.data?.message ?? err?.error);
      });
  };

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        name: data?.name,
        content: data?.content,
        variables: data?.variables,
        isActive: data.isActive,
      });
    }
  }, [data]);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Edit Template"
        pageTitle="Edit Templates"
        parentRoute={PATH_DASHBOARD.templates}
        parentSection="Templates"
      />
      <div className="row">
        <div className="col-sm-12"></div>
        <div className="card card-table comman-shadow">
          <div className="card-body">
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Edit Template</h3>
                </div>
              </div>
              <div className="row">
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
                    onSubmit={handleSubmit(handleUpdateTemplate)}>
                    <div className="row align-items-center">
                      <div className="col-6">
                        <RHFTextField name="name" label="Name" />
                      </div>
                      <div className="col-6">
                        <RHFSwitch name="isActive" label="Is Active" />
                      </div>
                    </div>
                    <div>
                      <RHFAutocomplete
                        name="variables"
                        label="Variables"
                        multiple
                        freeSolo
                      />
                    </div>
                    <div className="col-lg-12">
                      <RHFEditor name="content" label="Content" />
                    </div>
                    <div
                      className="col-lg-12"
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '50px',
                      }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}>
                        Update
                      </Button>
                    </div>
                  </FormProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTemplate;
