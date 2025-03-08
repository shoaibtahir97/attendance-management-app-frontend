import { yupResolver } from '@hookform/resolvers/yup';
import { Chip, InputLabel } from '@mui/material';
import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
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
  useAddTemplateMutation,
  useLazyGetTemplateVariablesQuery,
} from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import TemplateView from './components/TemplateView';

const AddTemplates = () => {
  const navigate = useNavigate();
  const [createTemplate] = useAddTemplateMutation();
  const [getTemplateVariables] = useLazyGetTemplateVariablesQuery();
  const { openNotification } = useNotification();
  const [variableOptions, setVariableOptions] = useState(null);
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
    createdFor: '',
    content: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(templateSchema),
  });

  const {
    handleSubmit,
    setError,
    getValues,
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
          navigate(-1);
        })
        .catch((err) => {
          openNotification('error', err?.data?.message ?? err.error);
        });
    }
  };

  const fetchModelVariables = async (e) => {
    await getTemplateVariables({ model: e.target.value })
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

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Add Template"
        pageTitle="Add Templates"
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
                  <h3 className="page-title">Add Template</h3>
                  <Tooltip
                    title={
                      <ul>
                        <li>1. Select whom you want to send to </li>
                        <li>
                          2. Use the available variables in your template by
                          enclosing in square brackets e.g [firstName].
                        </li>
                      </ul>
                    }
                    size="small">
                    <IoIosInformationCircleOutline size={'1.5em'} />
                  </Tooltip>
                </div>
              </div>
              <div className="row">
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(handleCreateTemplate)}>
                  <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12">
                      <RHFTextField name="name" label="Name" />
                    </div>
                    <div className="col-lg-4">
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
                    <div className="col-lg-4">
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
