// Third-Party
import { yupResolver } from '@hookform/resolvers/yup';
import './StudentRegistrationDialog.css';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from '@mui/material';
import { Button } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { MdClose } from 'react-icons/md';
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
import { useRegisterStudentMutation } from '../../../../redux/slices/apiSlices/studentApiSlice';
import { countries } from '../../../../utils/countries';
import { studentGenders } from '../../../AdmissionForm/config/constants';
import { moduleYears } from '../../../Courses/AddCourse';

export const StudentRegistrationDialog = ({ open, onClose, fetchStudents }) => {
  const { openNotification } = useNotification();
  const [registerStudent, { isLoading: loadingRegister }] =
    useRegisterStudentMutation();
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
  const handleClose = () => {
    reset();
    onClose();
  };

  const registerStudentData = async (data) => {
    await registerStudent(data)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);

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
            Register Student
          </Box>

          <IconButton
            onClick={handleClose}
            disabled={loadingRegister}
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
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(registerStudentData)}>
          <div className="student-registration-form">
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
                disabled={loadingRegister}>
                Cancel
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={loadingRegister}>
                Save
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
