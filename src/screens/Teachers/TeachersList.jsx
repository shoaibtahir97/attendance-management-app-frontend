import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import { useLazyGetUsersQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { FiEdit, FiEye } from 'react-icons/fi';
import { genders } from './AddTeacher';
import { SKELETON } from '../Students/StudentsList';
import TableSkeleton from '../../components/TableSkeleton';
import BulkUploadTeacher from './components/BulkUploadTeacher';

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
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastName.length - b.lastName.length,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.length - b.gender.length,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => (
        <>
          <div className="actions">
            <Link to="#" className="btn btn-sm bg-success-light me-2">
              <i className="feather-eye">
                <FiEye size="14px" />
              </i>
            </Link>
            <Link
              to={`${PATH_DASHBOARD.teacherEdit}/${record._id}`}
              className="btn btn-sm bg-danger-light">
              <i className="feather-edit">
                <FiEdit size="14px" />
              </i>
            </Link>
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [isBulkTeacherUploadModalVisible, setIsBulkTeacherUploadModalVisible] =
    useState(false);
  const open = Boolean(anchorEl);

  const openAddUserPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeAddUserPopover = (event) => {
    setAnchorEl(null);
  };

  const openUploadExcelModal = () =>
    setIsBulkTeacherUploadModalVisible(!isBulkTeacherUploadModalVisible);

  const fetchUsersByQuery = (data) => {
    fetchUsers({ ...data, ...usersQuery });
  };

  const usersQuerySchema = Yup.object().shape({
    id: Yup.string().trim(),
    name: Yup.string().trim(),
    email: Yup.string().trim(),
    gender: Yup.string().trim(),
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
      {isBulkTeacherUploadModalVisible && (
        <BulkUploadTeacher
          open={isBulkTeacherUploadModalVisible}
          handleClose={openUploadExcelModal}
          fetchStudents={fetchUsers}
        />
      )}
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
            <RHFTextField name="id" label="ID" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="name" label="Name" />
          </Box>

          <Box sx={{ width: '100%' }}>
            <RHFTextField name="email" label="Email Address" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFSelect
              name="gender"
              label="Gender"
              options={genders}
              sx={{ width: '100%' }}
            />
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
                    <Tooltip title="Add Teacher" placement="top">
                      <Link
                        // onClick={openAddUserPopover}
                        to={PATH_DASHBOARD.teacherAdd}
                        className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </Tooltip>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={closeAddUserPopover}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}>
                      <MenuItem
                        onClick={() => {
                          closeAddUserPopover();
                          navigate(PATH_DASHBOARD.teacherAdd);
                        }}>
                        Add Teacher
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          closeAddUserPopover();
                          openUploadExcelModal();
                        }}>
                        Add Bulk Teacher
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              {isLoading ? (
                SKELETON.map((_, index) => <TableSkeleton key={index} />)
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
                    className="table border-0 star-student table-hover table-center mb-0 datatable table-striped"
                    pagination={{
                      total: dataSource.totalRecords,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                      onChange: (page, pageSize) => {
                        setUsersQuery({
                          ...usersQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchUsers({ page, recordsPerPage: pageSize });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.users}
                    rowSelection={rowSelection}
                    rowKey={(record) => record._id}
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

export default TeachersList;
