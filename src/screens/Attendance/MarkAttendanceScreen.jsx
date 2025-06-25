import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Box, Grid, Stack, TextField } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoClock } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import {
  useLazyGetAttendanceQuery,
  useMarkAttendanceMutation,
  useResetAttendanceMutation,
} from '../../redux/slices/apiSlices/attendanceApiSlice';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import {
  addAbsentReason,
  addFirstIntervention,
  addSecondIntervention,
  addThirdIntervention,
  markAttendance,
  resetAttendanceRecord,
} from '../../redux/slices/attendanceSlice';
import { getFormattedDate } from '../../utils/formatDateTime';

const status = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Leave', value: 'leave' },
];

const recordsPerPage = 1000;

// const useStyle = createStyles(({ css, token }) => {
//   const { antCls } = token;
//   return {
//     customTable: css`
//       ${antCls}-table {
//         ${antCls}-table-container {
//           ${antCls}-table-body,
//           ${antCls}-table-content {
//             scrollbar-width: thin;
//             scrollbar-color: #eaeaea transparent;
//             scrollbar-gutter: stable;
//           }
//         }
//       }
//     `,
//   };
// });

export const SKELETON = ['', '', '', '', ''];

const attendanceReasons = [
  'Call sick',
  'GP Appointment',
  'Dentist Appointment',
  'Hospital Appointment',
  'Child Sick',
  'Holidays',
];

const MarkAttendanceScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // const { styles } = useStyle();
  const [groupId] = useState(state?.groupId);
  const [subjectId] = useState(state?.subjectId);
  const [startTime] = useState(state?.startTime);
  const [endTime] = useState(state?.endTime);
  const [subject] = useState(state?.subject);
  const [group] = useState(state?.group);

  const { openNotification } = useNotification();
  const dispatch = useDispatch();
  const [isAttendanceMarked, setIsAttendanceMarked] = useState('');

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
  const [resetAttendance, { isLoading: isResettingAttendance }] =
    useResetAttendanceMutation();

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const column = [
    {
      title: 'ID',
      dataIndex: 'studentId',
      sorter: (a, b) => a.studentId.length - b.studentId.length,
      width: '10%',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',

      fixed: 'left',
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

      fixed: 'left',
      width: '22%',
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
                  new Date() >= new Date(startTime)
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
    {
      title: 'Reason',
      dataIndex: 'reason',
      width: '25%',
      render: (text, record) => {
        const attendanceStatus = attendanceRecords?.find(
          (attendanceRecord) => attendanceRecord.studentId == record.id
        );
        return (
          <div>
            <Autocomplete
              value={attendanceStatus?.reason || ''}
              variant="outlined"
              size="small"
              freeSolo
              disabled={
                attendanceStatus?.status === 'present' ||
                attendanceStatus === undefined
              }
              options={attendanceReasons}
              onBlur={(event) => {
                dispatch(
                  addAbsentReason({
                    studentId: record?.id,
                    reason: event.target.value,
                  })
                );
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  {...params}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: 'search',
                    },
                  }}
                />
              )}
            />
          </div>
        );
      },
    },
    {
      title: 'First Intervention',
      dataIndex: 'firstIntervention',

      render: (text, record) => {
        const attendanceStatus = attendanceRecords?.find(
          (attendanceRecord) => attendanceRecord.studentId == record.id
        );
        return (
          <div>
            <TextField
              value={attendanceStatus?.firstIntervention}
              variant="outlined"
              size="small"
              onMouseOut={(event) => {
                dispatch(
                  addFirstIntervention({
                    studentId: record?.id,
                    firstIntervention: event.target.value,
                  })
                );
              }}
            />
          </div>
        );
      },
    },
    {
      title: 'Second Intervention',
      dataIndex: 'secondIntervention',
      render: (text, record) => {
        const attendanceStatus = attendanceRecords?.find(
          (attendanceRecord) => attendanceRecord.studentId == record.id
        );
        return (
          <div>
            <TextField
              value={attendanceStatus?.secondIntervention}
              variant="outlined"
              size="small"
              onMouseOut={(event) => {
                dispatch(
                  addSecondIntervention({
                    studentId: record?.id,
                    secondIntervention: event.target.value,
                  })
                );
              }}
            />
          </div>
        );
      },
    },
    {
      title: 'Third Intervention',
      dataIndex: 'thirdIntervention',
      render: (text, record) => {
        const attendanceStatus = attendanceRecords?.find(
          (attendanceRecord) => attendanceRecord.studentId == record.id
        );
        return (
          <div>
            <TextField
              value={attendanceStatus?.thirdIntervention}
              variant="outlined"
              size="small"
              onMouseOut={(event) => {
                dispatch(
                  addThirdIntervention({
                    studentId: record?.id,
                    thirdIntervention: event.target.value,
                  })
                );
              }}
            />
          </div>
        );
      },
    },
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

  const markMultipleAttendance = () => {
    selectedRowKeys.forEach((row, index) => {
      dispatch(
        markAttendance({
          studentId: row,
          status: 'present',
        })
      );
    });
  };

  const fetchStudents = async (data) => {
    const { date, ...query } = { ...data };

    await getStudents({ ...query, recordsPerPage, page: 1 })
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
      subject: subjectId,
      group: groupId,
      date: new Date(startTime),
      teacher: userInfo._id,
      startTime,
      endTime,
      attendanceRecords,
    };

    if (attendanceRecords.length !== dataSource.totalRecords) {
      openNotification('error', 'Please mark all students attendance');
      return;
    }

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
      date: startTime,
      group: groupId,
      subject: subjectId,
      page: 1,
      recordsPerPage,
    };
    await getAttendance({ ...data })
      .unwrap()
      .then((res) => {
        res?.records.forEach((record) => {
          dispatch(
            markAttendance({
              studentId: record?.studentId?._id,
              status: record?.status,
              ...(record.reason && { reason: record?.reason }),
              ...(record.firstIntervention && {
                firstIntervention: record.firstIntervention,
              }),
              ...(record.secondIntervention && {
                secondIntervention: record.secondIntervention,
              }),
              ...(record.thirdIntervention && {
                thirdIntervention: record.thirdIntervention,
              }),
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
        setIsAttendanceMarked(res._id);
      })
      .catch((err) => {
        if (err?.data?.status === 400) {
          fetchStudents({ group: groupId });
        }
      });
  }

  async function fetchAttendanceRecordsByDate(data) {
    await getAttendance({
      ...data,
      date: getFormattedDate(data?.date, 'YYYY-MM-DD'),
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

  async function handleResetAttendance() {
    await resetAttendance(isAttendanceMarked)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        dispatch(resetAttendanceRecord());
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err.error);
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
                      <p className="fs-6">Subject: {subject}</p>
                      <p className="fs-6 text-secondary">Group: {group}</p>
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
                        Time: {startTime?.split('T')[1]?.split('.')[0]}
                      </p>
                      <p className="fs-6 text-secondary">
                        Date: {getFormattedDate(startTime)}
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
                          new Date() > new Date(startTime)
                        }
                        type="primary"
                        size="large"
                        loading={loadingAttendance}>
                        Save Attendance
                      </Button>
                      {isAttendanceMarked && (
                        <Button
                          onClick={handleResetAttendance}
                          disabled={
                            userInfo.role === 'teacher' &&
                            new Date() > new Date(startTime)
                          }
                          type="default"
                          size="large"
                          loading={isResettingAttendance}>
                          Reset Attendance
                        </Button>
                      )}
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
                  <Button
                    disabled={selectedRowKeys.length === 0}
                    onClick={markMultipleAttendance}
                    htmlType="button"
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    type="primary">
                    Mark all as Present
                  </Button>
                  <Table
                    // className={styles.customTable}
                    pagination={{
                      total: dataSource?.filteredRecordsCount,
                      // showTotal: (total, range) =>
                      //   `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      defaultPageSize: recordsPerPage,
                    }}
                    columns={column}
                    dataSource={dataSource.students}
                    rowSelection={rowSelection}
                    rowKey={(record) => record.id}
                    scroll={{ x: 'max-content' }}
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
