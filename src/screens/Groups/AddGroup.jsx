import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import { useCreateGroupMutation } from '../../redux/slices/apiSlices/groupApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import EditStudentSkeleton from '../Students/components/EditStudentSkeleton';

const AddGroup = () => {
  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const [createGroup] = useCreateGroupMutation();

  const { openNotification } = useNotification();

  const groupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    course: Yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(groupSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitted },
  } = methods;

  const handleCreateGroup = async (data) => {
    await createGroup(data)
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
      {/* Page Header */}
      <PageHeader
        currentSection="Create Group"
        pageTitle="Create Group"
        parentRoute={PATH_DASHBOARD.groups}
        parentSection="Group"
      />
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              {loadingCourses ? (
                <EditStudentSkeleton />
              ) : (
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(handleCreateGroup)}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <h5 className="form-title student-info">Group Details</h5>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFTextField name="name" label="Group Name" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <RHFAutocomplete
                        name="course"
                        label="Course"
                        options={coursesList}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}>
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

export default AddGroup;
