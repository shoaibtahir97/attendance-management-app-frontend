import React, { useEffect, useState } from 'react';
import { useLazyGetStudentsQuery } from '../../../redux/slices/apiSlices/studentApiSlice';
import { Grid, Stack } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import TableSkeleton from '../../../components/TableSkeleton';
import { itemRender, onShowSizeChange } from '../../../components/Pagination';
import { SKELETON } from '../MarkAttendanceScreen';
import { getDate } from 'date-fns';
import { useSelector } from 'react-redux';
import { useMarkAttendanceMutation } from '../../../redux/slices/apiSlices/attendanceApiSlice';

const UnMarkedAttendance = (props) => {
  const { state } = props;
  const { group, groupId, startTime, endTime, subject, teacher, subjectId } =
    state;

  const { userInfo } = useSelector((state) => state.auth);

  const [getStudents, { isLoading, error }] = useLazyGetStudentsQuery();
  const [markStudentAttendance, { isLoading: loadingAttendance }] =
    useMarkAttendanceMutation();

  const { attendanceRecords } = useSelector((state) => state.attendanceRecords);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });

  const handleMarkAttendance = async () => {
    const payload = {
      subject: subjectId,
      group: groupId,
      date: getDate(startTime),
      teacher: userInfo._id,
      startTime,
      endTime,
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

  const fetchStudents = async () => {
    await getStudents({ group: groupId })
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

  useEffect(() => {
    if (state) fetchStudents();
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card card-table comman-shadow">
          <div className="card-body">
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
                  <p className="fs-6">Subject:{subject}</p>
                  <p className="fs-6 text-secondary">Group:{group}</p>
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
                  <p className="fs-6">
                    Time: {startTime} - {endTime}
                  </p>
                  <p className="fs-6 text-secondary">
                    Date: {getDate(startTime)}
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
                        group,
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
  );
};

export default UnMarkedAttendance;
