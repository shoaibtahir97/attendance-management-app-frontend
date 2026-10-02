// Third-Party
import { yupResolver } from '@hookform/resolvers/yup';
import './StudentRegistrationDialog.css';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Skeleton,
} from '@mui/material';
import { Button } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdClose } from 'react-icons/md';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Internal
import {
  FormProvider,
  RHFAutocomplete,
  RHFCountries,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '../../../../components/HookForm';
import useNotification from '../../../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../../../redux/slices/apiSlices/courseApiSlice';
import { useGetGroupsListQuery } from '../../../../redux/slices/apiSlices/groupApiSlice';
import {
  useGetStudentDetailsQuery,
  useRegisterStudentMutation,
  useUpdateStudentDetailsMutation,
} from '../../../../redux/slices/apiSlices/studentApiSlice';
import { countries } from '../../../../utils/countries';
import { studentGenders } from '../../../AdmissionForm/config/constants';
import { moduleYears } from '../../../Courses/AddCourse';

const StudentRegistrationSkeleton = () => (
  <Box
    aria-label="Loading student details"
    role="status"
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, minmax(0, 1fr))',
        md: 'repeat(3, minmax(0, 1fr))',
      },
      gap: 2,
      width: '100%',
    }}>
    {Array.from({ length: 11 }, (_, index) => (
      <Box key={index}>
        <Skeleton variant="text" width="42%" height={22} />
        <Skeleton variant="rounded" height={40} />
      </Box>
    ))}
    <Box
      sx={{
        gridColumn: '1 / -1',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1.5,
        pt: 2,
        mt: 1,
        borderTop: '1px solid #e5e7eb',
      }}>
      <Skeleton variant="rounded" width={82} height={32} />
      <Skeleton variant="rounded" width={82} height={32} />
    </Box>
  </Box>
);

export const StudentRegistrationDialog = ({
  open,
  onClose,
  fetchStudents,
  studentId,
}) => {
  const { openNotification } = useNotification();
  const [registerStudent, { isLoading: loadingRegister }] =
    useRegisterStudentMutation();
  const [updateStudentDetails, { isLoading: loadingUpdate }] =
    useUpdateStudentDetailsMutation();
  const {
    data: student,
    isFetching: loadingStudent,
    error: studentError,
  } = useGetStudentDetailsQuery(studentId, { skip: !open || !studentId });
  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();
  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();

  const studentSchema = Yup.object().shape({
    studentId: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    DOB: Yup.date().required(),
    phone: Yup.string().required(),
    email: Yup.string().email().required(),
    nationality: Yup.string().required(),
    group: Yup.string().required(),
    courseName: Yup.string().required(),
    gender: Yup.string().required(),
    year: Yup.string().required(),
  });

  const methods = useForm({
    resolver: yupResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      studentId: '',
      group: '',
      phone: '',
      email: '',
      gender: '',
      DOB: '',
      courseName: '',
      nationality: '',
      year: '',
    },
  });

  const { handleSubmit, reset } = methods;
  const isEditMode = Boolean(studentId);
  const isSaving = loadingRegister || loadingUpdate;

  useEffect(() => {
    if (open && studentId && student) {
      reset({
        ...student,
        courseName: student.courseName?._id || student.courseName || '',
        group: student.group?._id || student.group || '',
      });
    } else if (open && !studentId) {
      reset({
        firstName: '',
        lastName: '',
        studentId: '',
        group: '',
        phone: '',
        email: '',
        gender: '',
        DOB: '',
        courseName: '',
        nationality: '',
        year: '',
      });
    }
  }, [open, studentId, student, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const saveStudentData = async (data) => {
    const saveRequest = isEditMode
      ? updateStudentDetails({ ...data, _id: studentId })
      : registerStudent(data);

    await saveRequest
      .unwrap()
      .then((res) => {
        openNotification(
          'success',
          res?.message ||
            (isEditMode
              ? 'Student updated successfully'
              : 'Student registered successfully')
        );

        reset();

        // Refresh students table
        if (fetchStudents) {
          fetchStudents({
            page: 1,
            recordsPerPage: 10,
          });
        }

        // Close modal after successful registration
        if (handleClose) {
          handleClose();
        }
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      scroll="body">
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid #e5e7eb',
        }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box
            component="span"
            sx={{
              fontSize: '22px',
              fontWeight: 600,
              color: '#1f2937',
            }}>
            {isEditMode ? 'Edit Student' : 'Register Student'}
          </Box>

          <IconButton
            onClick={handleClose}
            disabled={isSaving}
            size="small">
            <MdClose />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 3,
          overflowY: 'auto',
        }}>
        {isEditMode && loadingStudent ? (
          <StudentRegistrationSkeleton />
        ) : (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(saveStudentData)}>
            <div className="student-registration-form">
              {studentError && (
                <div role="alert">
                  {studentError?.data?.message ||
                    studentError?.error ||
                    'Unable to load student details.'}
                </div>
              )}
            {/* Student Information */}

            {/* First Name */}
            <div className="form-field">
              <RHFTextField name="firstName" label="First Name" />
            </div>

            {/* Last Name */}
            <div className="form-field">
              <RHFTextField name="lastName" label="Last Name" />
            </div>

            {/* Student ID */}
            <div className="form-field">
              <RHFTextField name="studentId" label="Student ID" />
            </div>

            {/* Date of Birth */}
            <div className="form-field">
              <RHFDatePicker
                name="DOB"
                label="Date of Birth"
                sx={{
                  width: '100%',
                }}
              />
            </div>

            {/* Gender */}
            <div className="form-field">
              <RHFAutocomplete
                name="gender"
                label="Gender"
                options={studentGenders}
                freeSolo
              />
            </div>

            {/* Phone */}
            <div className="form-field">
              <RHFTextField name="phone" label="Phone" />
            </div>

            {/* Email */}
            <div className="form-field">
              <RHFTextField name="email" label="Email" />
            </div>

            {/* Nationality */}
            <div className="form-field">
              <RHFCountries
                name="nationality"
                label="Nationality"
                options={countries}
              />
            </div>

            {/* Course */}
            <div className="form-field">
              <RHFAutocomplete
                name="courseName"
                label="Course Name"
                options={coursesList}
              />
            </div>

            {/* Group */}
            <div className="form-field">
              <RHFAutocomplete
                name="group"
                label="Group"
                options={groupsList}
              />
            </div>

            {/* Year */}
            <div className="form-field">
              <RHFSelect name="year" label="Year" options={moduleYears} />
            </div>

            {/* Buttons */}
            <div className="form-actions">
              <Button
                type="default"
                onClick={handleClose}
                disabled={isSaving}>
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={isSaving}
                disabled={loadingStudent || Boolean(studentError)}>
                {isEditMode ? 'Update' : 'Save'}
              </Button>
            </div>
            </div>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
};
