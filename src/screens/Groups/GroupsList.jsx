import { Alert, Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import { useLazyGetGroupsQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

const SKELETON = ['', '', '', '', ''];

const GroupsList = () => {
  const methods = useForm();
  const [getGroups, { data, isLoading, error }] = useLazyGetGroupsQuery();
  const { data: coursesList, isLoading: loadingCourses } =
    useGetCoursesListQuery();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: 'Course',
      dataIndex: 'course',
      sorter: (a, b) => a.course.length - b.course.length,
    },
    {
      title: 'Students',
      dataIndex: 'students',
      render: (text, record) => <p>{text}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => {
        const onEditGroup = () => {
          navigate(`${PATH_DASHBOARD.groupEdit}/${record._id}`);
        };
        return (
          <>
            <div className="actions">
              <Tooltip title="Edit Group" placement="top">
                <IconButton onClick={onEditGroup}>
                  <FiEdit size="14px" />
                </IconButton>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const [groupsQuery, setGroupsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
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

  const [dataSource, setDataSource] = useState({
    courses: [],
    totalRecords: 0,
  });

  const { handleSubmit, getValues } = methods;

  const fetchGroups = async (query) => {
    await getGroups(query)
      .unwrap()
      .then((res) => {
        setDataSource({
          groups: res.groups,
          totalRecords: res.filteredGroups,
        });
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  const fetchGroupsByQuery = (data) => {
    fetchGroups({ ...data, ...groupsQuery });
  };

  useEffect(() => {
    fetchGroups(groupsQuery);
  }, []);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="All Groups"
        pageTitle="Groups"
        parentRoute={PATH_DASHBOARD.groups}
        parentSection="Group"
      />
      {/* /Page Header */}
      {/* Filters */}
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchGroupsByQuery)}>
        <Stack
          direction="row"
          alignItems="end"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="name" label="Group Name" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFAutocomplete
              name="course"
              label="Course"
              options={coursesList}
            />
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large">
              Search
            </Button>
          </Box>
        </Stack>
      </FormProvider>
      {/* Filters */}
      {/* Course Data */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Groups</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    {/* {dataSource.students.length ? (
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </Link>
                    ) : (
                      <></>
                    )} */}
                    <Tooltip title="Add group" placement="top">
                      <Link
                        to={PATH_DASHBOARD.groupAdd}
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
                        setGroupsQuery({
                          ...groupsQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchGroups({
                          page,
                          recordsPerPage: pageSize,
                          ...getValues(),
                        });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.groups}
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

export default GroupsList;
