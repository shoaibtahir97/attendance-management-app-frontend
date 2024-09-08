import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { Alert, Box, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { useLazyGetCoursesQuery } from '../../redux/slices/apiSlices/coursesApiSlice';
import { Link } from 'react-router-dom';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import { FiEye } from 'react-icons/fi';
import { FiEdit } from 'react-icons/fi';

export const column = [
  {
    title: 'Course code',
    dataIndex: 'code',
    sorter: (a, b) => a.code.length - b.code.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: (text, record) => <h2 className="table-avatar">{text}</h2>,
  },
  {
    title: 'Groups',
    dataIndex: 'groups',
    sorter: (a, b) => a.groups.length - b.groups.length,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    render: (text, record) => (
      <>
        <div className="actions">
          <Link className="btn btn-sm bg-danger-light">
            <i className="feather-edit">
              <FiEye />
            </i>
          </Link>
          <Link
            to={`${PATH_DASHBOARD.teacherEdit}/${record._id}`}
            className="btn btn-sm bg-danger-light">
            <i className="feather-edit">
              <FiEdit />
            </i>
          </Link>
        </div>
      </>
    ),
  },
];

const SKELETON = ['', '', '', '', ''];

const CoursesList = () => {
  const methods = useForm();
  const [getCourses, { data, isLoading, error }] = useLazyGetCoursesQuery();
  const [coursesQuery, setCoursesQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });
  const { openNotification } = useNotification();

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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const fetchCourses = async (query) => {
    await getCourses(query)
      .unwrap()
      .then((res) => {
        setDataSource({
          courses: res.courses,
          totalRecords: res.filteredRecordsCount,
        });
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  const fetchCoursesByQuery = (data) => {
    fetchCourses({ ...data, ...coursesQuery });
  };

  useEffect(() => {
    fetchCourses(coursesQuery);
  }, []);

  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="All Courses"
        pageTitle="Courses"
        parentRoute={PATH_DASHBOARD.courses}
        parentSection="Course"
      />
      {/* /Page Header */}
      {/* Filters */}
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchCoursesByQuery)}>
        <Stack
          direction="row"
          alignItems="end"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="courseId" label="Course ID" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="courseName" label="Course Name" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="cohortStartDate" label="Cohort Start date" />
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
                    <h3 className="page-title">Courses</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    {/* {dataSource.students.length ? (
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </Link>
                    ) : (
                      <></>
                    )} */}
                    <Tooltip title="Add course" placement="top">
                      <Link
                        to={PATH_DASHBOARD.courseAdd}
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
                        setCoursesQuery({
                          ...coursesQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchCourses({ page, recordsPerPage: pageSize });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.courses}
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

export default CoursesList;
