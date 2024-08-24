import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../../Pagination';
import { useState } from 'react';
import {
  studentApiSlice,
  useGetStudentsQuery,
  useLazyGetStudentDetailsQuery,
  useLazyGetStudentsQuery,
} from '../../../redux/slices/studentApiSlice';
import { PATH_DASHBOARD } from '../../../routes/paths';
import PageHeader from '../../PageHeader';
import { apiSlice } from '../../../redux/slices/apiSlice';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../HookForm';
import { Box, Grid, Stack } from '@mui/material';
import TableSkeleton from '../../TableSkeleton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const column = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    sorter: (a, b) => a.studentId.length - b.studentId.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: (text, record) => (
      <>
        <h2 className="table-avatar">
          {text}
          {/* <Link to="/studentsview" className="avatar avatar-sm me-2 ">
            <img
              className="avatar-img rounded-circle"
              src={record.Img}
              alt="User Image"
            />
          </Link>
          <Link className="text-dark" to="/studentsview">
            {record.Name}
          </Link> */}
        </h2>
      </>
    ),
  },
  {
    title: 'Group',
    dataIndex: 'group',
    sorter: (a, b) => a.group.length - b.group.length,
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.length - b.gender.length,
  },
  {
    title: 'DOB',
    dataIndex: 'dateOfBirth',
    sorter: (a, b) => a.dateOfBirth.length - b.dateOfBirth.length,
  },
  {
    title: 'Parent Name',
    dataIndex: 'parentName',
    sorter: (a, b) => a.parentName.length - b.parentName.length,
  },
  {
    title: 'Emergency Number',
    dataIndex: 'emergencyNumber',
    sorter: (a, b) => a.emergencyNumber.length - b.emergencyNumber.length,
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
          <Link
            to={`${PATH_DASHBOARD.studentEdit}/${record.id}`}
            className="btn btn-sm bg-danger-light">
            <i className="feather-edit">
              <FeatherIcon icon="edit" className="list-edit" />
            </i>
          </Link>
        </div>
      </>
    ),
  },
];

const SKELETON = ['', '', '', '', ''];

const Students = () => {
  const [studentsQuery, setStudentsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });
  // const { data, isLoading, error } = useGetStudentsQuery(defaultQuery);
  const [getStudents, { data, isLoading, error }] = useLazyGetStudentsQuery();

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const studentQuerySchema = Yup.object().shape({
    studentId: Yup.string().trim(),
    name: Yup.string().trim(),
    phoneNumber: Yup.string().trim(),
  });

  const methods = useForm({
    resolver: yupResolver(studentQuerySchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const fetchStudents = async (query) => {
    await getStudents(query)
      .unwrap()
      .then((res) => {
        const { students, totalRecordsCount, filteredRecordsCount } = res;
        if (students && students.length > 0) {
          const updatedStudents = students.map((student) => ({
            id: student.id,
            studentId: student.studentId,
            name: `${student.firstName} ${student.lastName}`,
            group: student.group,
            phoneNumber: student.phoneNumber,
            emailAddress: student.emailAddress,
            address: student.address,
            gender: student.gender,
            dateOfBirth: student.dateOfBirth,
            parentName: student.parentName,
            emergencyNumber: student.emergencyNumber,
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
      });
  };

  const fetchStudentsByQuery = (data) => {
    fetchStudents({ ...data, ...studentsQuery });
  };

  useEffect(() => {
    fetchStudents(studentsQuery);
  }, []);

  return (
    <>
      <div className="content container-fluid">
        {/* Page Header  */}
        <PageHeader
          currentSection="All Students"
          pageTitle="Students"
          parentRoute={PATH_DASHBOARD.students}
          parentSection="Student"
        />
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(fetchStudentsByQuery)}>
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}>
            <Box sx={{ width: '100%' }}>
              <RHFTextField name="studentId" label="Student ID" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <RHFTextField name="name" label="Name" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <RHFTextField name="phoneNumber" label="Phone number" />
            </Box>
            <Box sx={{ width: '100%', mt: 1 }}>
              <Button
                loading={isSubmitting}
                type="primary"
                htmlType="submit"
                size="large">
                Search
              </Button>
            </Box>
          </Stack>
        </FormProvider>

        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table comman-shadow">
              <div className="card-body">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Students</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      {dataSource.students.length ? (
                        <Link to="#" className="btn btn-outline-primary me-2">
                          <i className="fas fa-download" /> Download
                        </Link>
                      ) : (
                        <></>
                      )}
                      <Tooltip title="Add student">
                        <Link
                          to={PATH_DASHBOARD.studentAdd}
                          className="btn btn-primary">
                          <i className="fas fa-plus" />
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                </div>
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
                          fetchStudents({ page, recordsPerPage: pageSize });
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
        {/* // )} */}
      </div>
    </>
  );
};

export default Students;
