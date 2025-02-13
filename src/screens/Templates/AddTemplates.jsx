import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
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
import { useAddTemplateMutation } from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

const AddTemplates = () => {
  const [createTemplate] = useAddTemplateMutation();
  const { openNotification } = useNotification();

  const templateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    isActive: Yup.boolean(),
    content: Yup.string().required('Content is required'),
    variables: Yup.array().of(Yup.string().required('Variable is required')),
  });

  const defaultValues = {
    name: '',
    isActive: true,
    content: '',
    variables: [],
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(templateSchema),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = methods;

  const handleCreateTemplate = async (data) => {
    if (data.content === '<p><br></p>') {
      setError('content', {
        type: 'manual',
        message: 'Content is required',
      });
    } else {
      await createTemplate(data)
        .unwrap()
        .then((res) => {
          openNotification('success', res?.message);
        })
        .catch((err) => {
          openNotification('error', err?.data?.message ?? err.error);
        });
    }
  };

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Add Template"
        pageTitle="Add Templates"
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
                  <h3 className="page-title">Add Template</h3>
                </div>
              </div>
              <div className="row">
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(handleCreateTemplate)}>
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                      <RHFTextField name="name" label="Name" />
                    </div>
                    <div className="col-lg-6">
                      <RHFSwitch name="isActive" label="Is Active" />
                    </div>
                  </div>

                  {/* <div className="col-lg-6 col-md-12">
                    <RHFSelect
                      name=""
                      label="Send to"
                      options={[
                        { label: 'student', value: 'student' },
                        { label: 'teacher', value: 'teacher' },
                      ]}
                    />
                  </div> */}
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
                      Submit
                    </Button>
                  </div>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplates;
