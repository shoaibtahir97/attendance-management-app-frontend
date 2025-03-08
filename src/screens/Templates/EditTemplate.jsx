import { yupResolver } from '@hookform/resolvers/yup';
import { Chip, InputLabel } from '@mui/material';
import { Alert, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import {
  useGetTemplateDetailsQuery,
  useLazyGetTemplateVariablesQuery,
  useUpdateTemplateDetailsMutation,
} from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';
import TemplateView from './components/TemplateView';

const EditTemplate = () => {
  const { openNotification } = useNotification();
  const [variableOptions, setVariableOptions] = useState(null);
  const [getTemplateVariables] = useLazyGetTemplateVariablesQuery();

  const { id: templateId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetTemplateDetailsQuery(templateId);

  const [updateTemplate] = useUpdateTemplateDetailsMutation();

  const [isTemplateViewModalVisible, setIsTemplateViewModalVisible] =
    useState(false);

  const templateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    isActive: Yup.boolean(),
    createdFor: Yup.string().required(),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    name: '',
    isActive: true,
    content: '',
    createdFor: '',
  };

  const methods = useForm({
    resolver: yupResolver(templateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    getValues,
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

  const fetchModelVariables = async (createdFor) => {
    await getTemplateVariables({ model: createdFor })
      .unwrap()
      .then((res) => {
        setVariableOptions(res.data);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  const handleViewTemplate = () => {
    setIsTemplateViewModalVisible(!isTemplateViewModalVisible);
  };

  useEffect(() => {
    if (data) {
      fetchModelVariables(data.createdFor);
      reset({
        ...data,
        name: data.name,
        content: data.content,
        createdFor: data.createdFor,
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
      <TemplateView
        isShowModal={isTemplateViewModalVisible}
        closeModal={handleViewTemplate}
        template={getValues('content')}
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
                      <div className="col-4">
                        <RHFTextField name="name" label="Name" />
                      </div>
                      <div className="col-4">
                        <RHFSelect
                          name="createdFor"
                          label="Created for"
                          onChange={(e) => fetchModelVariables(e)}
                          options={[
                            { label: 'Teacher', value: 'teacher' },
                            { label: 'Student', value: 'student' },
                          ]}
                        />
                      </div>
                      <div className="col-4">
                        <RHFSwitch name="isActive" label="Is Active" />
                      </div>
                    </div>

                    <div className="row align-items-left">
                      <div>
                        <InputLabel
                          variant="outlined"
                          htmlFor="uncontrolled-native">
                          Variables
                        </InputLabel>
                        <div style={{ margin: '2em' }}>
                          {variableOptions && variableOptions.length > 0
                            ? variableOptions.map((variable, index) => (
                                <Chip
                                  key={index}
                                  label={variable}
                                  sx={{ mx: 0.2 }}
                                />
                              ))
                            : 'No variables found'}
                        </div>
                      </div>
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
                        gap: 10,
                      }}>
                      <Button
                        type="default"
                        htmlType="button"
                        onClick={handleViewTemplate}>
                        Preview
                      </Button>
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
