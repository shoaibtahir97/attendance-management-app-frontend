import React, { useEffect, useState } from 'react';
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { GoClock } from 'react-icons/go';
import { getFormattedDate, getFormattedTime } from '../../utils/formatDateTime';
import { Box, Grid, Stack, TextField } from '@mui/material';
import {
  useLazyGetAttendanceQuery,
  useMarkAttendanceMutation,
} from '../../redux/slices/apiSlices/attendanceApiSlice';
import useNotification from '../../hooks/useNotification';
import {
  markAttendance,
  resetAttendanceRecord,
} from '../../redux/slices/attendanceSlice';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { render } from '@fullcalendar/core/preact.js';
import UnMarkedAttendance from './components/UnMarkedAttendance';
import { getTime, set } from 'date-fns';

const status = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Leave', value: 'leave' },
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

export const SKELETON = ['', '', '', '', ''];

const MarkAttendanceScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // const { group, groupId, startTime, endTime, subject, teacher, subjectId } =
  //   state;
  const { openNotification } = useNotification();
  const dispatch = useDispatch();

  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();
  const { data: subjectsList, isLoading: loadingSubjects } =
    useGetSubjectsListQuery();

  const [getAttendance, { loading: loadingGetAttendance }] =
    useLazyGetAttendanceQuery();
  const { userInfo } = useSelector((state) => state.auth);

  const { attendanceRecords } = useSelector((state) => state.attendanceRecords);
  const [markStudentAttendance, { isLoading: loadingAttendance }] =
    useMarkAttendanceMutation();

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
              (attendanceRecord) => attendanceRecord.studentId === record.id
            );

            return (
              <Button
                disabled={
                  userInfo.role === 'teacher' &&
                  new Date() >= new Date(state?.startTime)
                }
                key={index}
                type="primary"
                onClick={() => {
                  dispatch(
                    markAttendance({
                      studentId: record.id,
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
                            status.value === 'leave'
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
                            status.value === 'leave'
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
    // {
    //   title: 'Reason',
    //   dataIndex: 'reason',
    //   render: (text, record) => {
    //     const attendanceStatus = attendanceRecords.find(
    //       (attendanceRecord) => attendanceRecord.studentId === record.studentId
    //     );
    //     return (
    //       <div>
    //         <TextField
    //           value={record.reason}
    //           variant="outlined"
    //           size="small"
    //           multiline
    //           maxRows={2}
    //           onChange={(event) => {
    //             setTimeout(() => {
    //               dispatch(
    //                 markAttendance({
    //                   studentId: record.studentId,
    //                   reason: event.target.value,
    //                   status: attendanceStatus?.status,
    //                 })
    //               );
    //             }, 1000);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const attendanceSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    subject: Yup.string().required('Subject is required'),
    group: Yup.string().required('Group is required'),
  });

  const defaultValues = {
    date: '',
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
    const { date, ...query } = { ...data };

    await getStudents({ ...query })
      .unwrap()
      .then((res) => {
        const { students, totalRecords, filteredRecordsCount } = res;
        if (students && students.length > 0) {
          const updatedStudents = students.map((student) => ({
            studentId: student.studentId,
            id: student._id,
            name: `${student.firstName} ${student.lastName}`,
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
      subject: state?.subjectId,
      group: state?.groupId,
      date: new Date(state?.startTime),
      teacher: userInfo._id,
      startTime: state?.startTime,
      endTime: state?.endTime,
      attendanceRecords,
    };

    await markStudentAttendance(payload)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.data);
        dispatch(resetAttendanceRecord());
        navigate(-1);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err.error);
      });
  };

  async function fetchAttendanceRecords() {
    const data = {
      date: state?.startTime,
      group: state?.groupId,
      subject: state?.subjectId,
    };
    await getAttendance({ ...data })
      .unwrap()
      .then((res) => {
        res?.records.forEach((record) => {
          dispatch(
            markAttendance({
              studentId: record?.studentId?._id,
              status: record?.status,
            })
          );
        });

        const attendanceRecords = res?.records.map((record) => ({
          studentId: record?.studentId?.studentId,
          name:
            record?.studentId?.firstName + ' ' + record?.studentId?.lastName,
          id: record?.studentId?._id,
        }));
        setDataSource({
          students: attendanceRecords,
          totalRecords: attendanceRecords.length,
        });
      })
      .catch((err) => {
        if (err?.data?.status === 400) {
          fetchStudents({ group: state?.groupId });
        }
      });
  }

  async function fetchAttendanceRecordsByDate(data) {
    await getAttendance({
      ...data,
      date: new Date(data?.date),
    })
      .unwrap()
      .then((res) => {
        res?.records.forEach((record) => {
          dispatch(
            markAttendance({
              studentId: record?.studentId?._id,
              status: record?.status,
            })
          );
        });

        const attendanceRecords = res?.records.map((record) => ({
          studentId: record?.studentId?.studentId,
          name:
            record?.studentId?.firstName + ' ' + record?.studentId?.lastName,
          id: record?.studentId?._id,
        }));
        setDataSource({
          students: attendanceRecords,
          totalRecords: attendanceRecords.length,
        });
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  }

  useEffect(() => {
    if (state) {
      fetchAttendanceRecords();
    }

    return () => {
      dispatch(resetAttendanceRecord());
    };
  }, []);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Mark Attendance"
        pageTitle="Attendance"
        //  parentRoute={PATH_DASHBOARD.teachers}
        parentSection="Attendance"
      />

      {userInfo.role === 'admin' && (
        <div className="student-group-form">
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(fetchAttendanceRecordsByDate)}>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: 2 }}>
              <Box sx={{ width: '100%' }}>
                <RHFDatePicker
                  name="date"
                  label="Date"
                  disabled={userInfo.role === 'teacher'}
                  sx={{ width: '100%' }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <RHFAutocomplete
                  name={'group'}
                  label={'Group'}
                  options={groupsList}
                  sx={{ width: '100%' }}
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <RHFAutocomplete
                  name={'subject'}
                  label={'Subject'}
                  options={subjectsList}
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
      )}

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
                    sm={4}
                    sx={{ borderRight: '1px solid #aeb1bd', pr: 1 }}>
                    <Stack
                      direction="column"
                      spacing={1}
                      alignItems="left"
                      justifyContent="center">
                      <p className="fs-6">Subject:{state?.subject}</p>
                      <p className="fs-6 text-secondary">
                        Group:{state?.group}
                      </p>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ borderRight: '1px solid #aeb1bd', pr: 1 }}>
                    <Stack
                      direction="column"
                      spacing={1}
                      alignItems="left"
                      justifyContent="center">
                      <p className="fs-6">
                        Time: {getFormattedTime(state?.startTime)}
                      </p>
                      <p className="fs-6 text-secondary">
                        Date: {getFormattedDate(state?.startTime)}
                      </p>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="space-around">
                      <Button
                        onClick={handleMarkAttendance}
                        disabled={
                          userInfo.role === 'teacher' &&
                          new Date() > new Date(state?.startTime)
                        }
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
                        // setStudentsQuery({
                        //   ...studentsQuery,
                        //   page,
                        //   recordsPerPage: pageSize,
                        // });
                        fetchStudents({
                          page,
                          recordsPerPage: pageSize,
                          group: state?.groupId,
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
