import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import { useLazyGetUsersQuery } from '../../redux/slices/apiSlices/usersApiSlice';

const TeachersList = () => {
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
      dataIndex: '_id',
      sorter: (a, b) => a._id.length - b._id.length,
      // render: (text, record) => (
      //     <>
      //         <Link to="/viewinvoice">{record.TeachersID}</Link>
      //     </>
      // )
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      // render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: 'Group',
      dataIndex: 'groups',
      sorter: (a, b) => a.groups.length - b.groups.length,
    },

    {
      title: 'Subject',
      dataIndex: 'subjects',
      sorter: (a, b) => a.subjects.length - b.subjects.length,
    },

    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => (
        <>
          <div className="actions">
            <Tooltip title="View Course" placement="top">
              <IconButton>
                <FiEye size="14px" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Course" placement="top">
              <IconButton onClick={onEditTeacher}>
                <FiEdit size="14px" />
              </IconButton>
            </Tooltip>
          </div>
        </>
      ),
    },
  ];

  const [dataSource, setDataSource] = useState({
    users: [],
    totalRecords: 0,
  });
  const [getUsers, { data, isLoading, error }] = useLazyGetUsersQuery();

  const [usersQuery, setUsersQuery] = useState({
    page: 1,
    recordsPerPage: 10,
    role: 'teacher',
  });

  const fetchUsersByQuery = (data) => {
    fetchUsers({ ...data, ...usersQuery });
  };

  const usersQuerySchema = Yup.object().shape({
    name: Yup.string().trim(),
    group: Yup.string().trim(),
    phoneNumber: Yup.string().trim(),
  });

  const methods = useForm({
    resolver: yupResolver(usersQuerySchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const fetchUsers = async (query) => {
    getUsers(query)
      .unwrap()
      .then((res) => {
        const { users, filteredUsers } = res;
        setDataSource({
          users,
          totalRecords: filteredUsers,
        });
      });
  };

  useEffect(() => {
    fetchUsers(usersQuery);
  }, []);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="All Teachers"
        pageTitle="Teachers"
        parentRoute={PATH_DASHBOARD.teachers}
        parentSection="Teacher"
      />
      {/* /Page Header */}
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchUsersByQuery)}>
        <Stack
          direction="row"
          alignItems="end"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="name" label="Name" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="group" label="group" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="phoneNumber" label="Phone number" />
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Button
              loading={isSubmitting}
              type="primary"
              htmlType="submit"
              className="btn btn-primary"
              size="large">
              Search
            </Button>
          </Box>
        </Stack>
      </FormProvider>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Teachers</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    {/* {dataSource.users.length ? (
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </Link>
                    ) : (
                      <></>
                    )} */}
                    <Tooltip title="Add teacher" placement="top">
                      <Link
                        to={PATH_DASHBOARD.teacherAdd}
                        className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <div className="table-responsive">
                <Table
                  className="table border-0 star-student table-hover table-center mb-0 datatable table-striped"
                  pagination={{
                    total: dataSource.totalRecords,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  columns={column}
                  dataSource={dataSource.users}
                  rowSelection={rowSelection}
                  rowKey={(record) => record._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
