import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFSelect,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useSelector } from 'react-redux';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { Alert, Button, Table } from 'antd';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { GoClock } from 'react-icons/go';
import { getFormattedDate } from '../../utils/formatDateTime';
import { Box, Grid, Stack } from '@mui/material';
import { useMarkAttendanceMutation } from '../../redux/slices/apiSlices/attendanceApiSlice';
import useNotification from '../../hooks/useNotification';
import {
  markAttendance,
  resetAttendanceRecord,
} from '../../redux/slices/attendanceSlice';

const MarkAttendanceScreen = () => {
  const { groups } = useSelector((state) => state.groups);
  const { subjects } = useSelector((state) => state.subjects);
  const { userInfo } = useSelector((state) => state.auth);
  const { attendanceRecords } = useSelector((state) => state.attendanceRecords);
  const [markStudentAttendance, { isLoading: loadingAttendance }] =
    useMarkAttendanceMutation();
  const { openNotification } = useNotification();

  const dispatch = useDispatch();
  const [getStudents, { data, isLoading, error }] = useLazyGetStudentsQuery();

  const [studentsQuery, setStudentsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const status = [
    { label: 'Present', value: 'present' },
    { label: 'Absent', value: 'absent' },
    { label: 'Late', value: 'late' },
  ];

  const timeSlotOptions = [
    {
      label: '9:30 - 13:30',
      value: '9:30 - 13:30',
    },
    {
      label: '13:30 - 17:30',
      value: '13:30 - 17:30',
    },
    {
      label: '17:30 - 21:30',
      value: '17:30 - 21:30',
    },
  ];

  const SKELETON = ['', '', '', '', ''];

  const column = [
    {
      title: 'ID',
      dataIndex: 'studentId',
      sorter: (a, b) => a.studentId.length - b.studentId.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <>
          <h2 className="table-avatar">{record.name}</h2>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => (
        <div role="group" aria-label="Basic mixed styles example">
          {status?.map((status, index) => {
            const attendanceStatus = attendanceRecords.find(
              (attendanceRecord) =>
                attendanceRecord.studentId === record.studentId
            );

            return (
              <Button
                key={index}
                type="primary"
                onClick={() => {
                  dispatch(
                    markAttendance({
                      studentId: record.studentId,
                      status: status.value,
                    })
                  );
                }}
                style={{
                  backgroundColor:
                    attendanceStatus?.status === status.value &&
                    status.value === 'present'
                      ? '#DCF8E9'
                      : attendanceStatus?.status === status.value &&
                          status.value === 'absent'
                        ? '#FEE9EB'
                        : attendanceStatus?.status === status.value &&
                            status.value === 'late'
                          ? '#FBF2E5'
                          : '#F1F5F8',
                  color:
                    attendanceStatus?.status === status.value &&
                    status.value === 'present'
                      ? '#43ab80'
                      : attendanceStatus?.status === status.value &&
                          status.value === 'absent'
                        ? '#c95f6d'
                        : attendanceStatus?.status === status.value &&
                            status.value === 'late'
                          ? '#dba86b'
                          : '#93989e',
                  margin: 1,
                }}
                icon={
                  status.value === 'present' ? (
                    <IoMdCheckmark />
                  ) : status.value === 'absent' ? (
                    <RxCross2 />
                  ) : (
                    <GoClock />
                  )
                }>
                {status.label}
              </Button>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Warning Letters Issued',
      dataIndex: 'numOfWarningLettersIssued',
      sorter: (a, b) =>
        a.numOfWarningLettersIssued.length - b.numOfWarningLettersIssued.length,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => (
        <>
          <div className="actions">
            <Link to="#" className="btn btn-sm bg-success-light me-2">
              <i className="feather-eye">
                <FeatherIcon icon="eye" />
              </i>
            </Link>
            <Link to="/editstudent" className="btn btn-sm bg-danger-light">
              <i className="feather-edit">
                <FeatherIcon icon="edit" className="list-edit" />
              </i>
            </Link>
          </div>
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const attendanceSchema = Yup.object().shape({
    date: Yup.string().required(),
    timeSlot: Yup.string(),
    // .required('Time slot is required'),
    subject: Yup.string(),
    // .required('Subject is required'),
    group: Yup.string(),
    // .required('Group is required'),
  });

  const defaultValues = {
    date: dayjs(),
    timeSlot: '',
    subject: '',
    group: '',
  };

  const methods = useForm({
    resolver: yupResolver(attendanceSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const fetchStudents = async (data) => {
    const { date, subject, ...query } = { ...data };

    await getStudents({ ...query })
      .unwrap()
      .then((res) => {
        dispatch(resetAttendanceRecord());
        const { students, totalRecords, filteredRecordsCount } = res;
        if (students && students.length > 0) {
          const updatedStudents = students.map((student) => ({
            id: student.id,
            studentId: student.studentId,
            name: `${student.firstName} ${student.lastName}`,
            numOfWarningLettersIssued:
              student.numOfWarningLettersIssued &&
              student.numOfWarningLettersIssued.length
                ? student.numOfWarningLettersIssued.length
                : 0,
          }));
          setDataSource({
            students: updatedStudents,
            totalRecords: filteredRecordsCount,
          });
        }
      })
      .catch((err) => {});
  };

  const handleMarkAttendance = async () => {
    const data = {
      ...getValues(),
    };
    const payload = {
      subject: data.subject,
      group: data.group,
      date: data.date,
      teacher: userInfo._id,
      startTime: data.timeSlot.split('-')[0].trim(),
      endTime: data.timeSlot.split('-')[1].trim(),
      attendanceRecords,
    };

    await markStudentAttendance(payload)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.data);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err.error);
      });
  };

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Mark Attendance"
        pageTitle="Attendance"
        //  parentRoute={PATH_DASHBOARD.teachers}
        parentSection="Attendance"
      />
      <div className="student-group-form">
        <FormProvider methods={methods} onSubmit={handleSubmit(fetchStudents)}>
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}>
            <Box sx={{ width: '100%' }}>
              <RHFDatePicker name="date" label="Date" disabled />
            </Box>
            <Box sx={{ width: '100%' }}>
              <RHFSelect
                name="timeSlot"
                label="Period"
                options={timeSlotOptions}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <RHFAutocomplete
                name={'group'}
                label={'Group'}
                options={groups.map((group) => ({
                  value: group._id,
                  label: group.name,
                }))}
                sx={{ width: '100%' }}
              />
            </Box>
            <Box width="100%">
              <RHFAutocomplete
                name="subject"
                label="Subject"
                options={subjects.map((subject) => ({
                  value: subject._id,
                  label: subject.name,
                }))}
                sx={{ width: '100%' }}
              />
            </Box>
            <Box sx={{ width: '100%', mt: 1 }}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                loading={isSubmitting}>
                Search
              </Button>
            </Box>
          </Stack>
        </FormProvider>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              {dataSource.students && dataSource.students.length > 0 && (
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ borderRight: '1px solid #aeb1bd', pr: 1 }}>
                    <Stack
                      direction="column"
                      spacing={1}
                      alignItems="left"
                      justifyContent="center">
                      <p className="fs-6">
                        Subject:{' '}
                        {subjects?.map((subject) => {
                          if (subject._id === getValues('subject')) {
                            return subject.name;
                          }
                        })}
                      </p>
                      <p className="fs-6 text-secondary">
                        Group:{' '}
                        {groups?.map((group) => {
                          if (group._id === getValues('group')) {
                            return group.name;
                          }
                        })}
                      </p>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ borderRight: '1px solid #aeb1bd', pr: 1 }}>
                    <Stack
                      direction="column"
                      spacing={1}
                      alignItems="left"
                      justifyContent="center">
                      <p className="fs-6">Time: {getValues('timeSlot')}</p>
                      <p className="fs-6 text-secondary">
                        Date: {getFormattedDate(getValues('date'), 'll')}
                      </p>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-around">
                      {/* <p className="fs-6 text-warning">Pending</p> */}
                      <Button
                        onClick={handleMarkAttendance}
                        type="primary"
                        size="large"
                        loading={loadingAttendance}>
                        Save Attendance
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              )}
              {isLoading ? (
                SKELETON.map((_, index) => (
                  <TableSkeleton key={index} columns={column} />
                ))
              ) : error ? (
                <Alert
                  message="Error"
                  description={error?.data?.message || error.error}
                  type="error"
                  showIcon
                />
              ) : (
                <div className="table-responsive">
                  <Table
                    pagination={{
                      total: dataSource?.totalRecords,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                      onChange: (page, pageSize) => {
                        setStudentsQuery({
                          ...studentsQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchStudents({
                          page,
                          recordsPerPage: pageSize,
                          ...getValues(),
                        });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.students}
                    rowSelection={rowSelection}
                    rowKey={(record) => record.id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendanceScreen;
