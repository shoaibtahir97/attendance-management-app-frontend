import { Alert, Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import {
  useDeleteCourseMutation,
  useLazyGetCoursesQuery,
} from '../../redux/slices/apiSlices/courseApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

const SKELETON = ['', '', '', '', ''];

const CoursesList = () => {
  const methods = useForm();
  const [getCourses, { data, isLoading, error }] = useLazyGetCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const column = [
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
      title: 'Cohort',
      dataIndex: 'cohortStartDate',
      sorter: (a, b) => a.cohortStartDate.length - b.cohortStartDate.length,
      render: (text, record) => {
        return <div>{text ? format(text, 'MMM yy') : '-'}</div>;
      },
    },
    {
      title: 'Students',
      dataIndex: 'students',
      sorter: (a, b) => a.students.length - b.students.length,
      render: (text, record) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => {
        const onEditCourse = () => {
          navigate(`${PATH_DASHBOARD.courseEdit}/${record._id}`);
        };
        return (
          <>
            <div className="actions">
              <Tooltip title="Edit Course" placement="top">
                <IconButton onClick={onEditCourse}>
                  <FiEdit size="14px" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Course" placement="top">
                <IconButton
                  onClick={() => {
                    setSelectedRowKeys([record._id]);
                    toggleDeleteConfirmationDialog();
                  }}>
                  <FiTrash fontSize={'14px'} />
                </IconButton>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const [coursesQuery, setCoursesQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
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

  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const toggleDeleteConfirmationDialog = () => {
    if (isDeleteConfirmDialogOpen) {
      setSelectedRowKeys([]);
    }
    setIsDeleteConfirmDialogOpen(!isDeleteConfirmDialogOpen);
  };
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

  const handleDeleteCourse = async () => {
    await deleteCourse({ _id: selectedRowKeys[0] })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        fetchCourses(coursesQuery);
        toggleDeleteConfirmationDialog();
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message ?? err.error);
      });
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
      {/* Delete Course */}
      <DeleteConfirmationDialog
        isShowModal={isDeleteConfirmDialogOpen}
        showModalMethod={toggleDeleteConfirmationDialog}
        dialogTitle="Delete Course"
        // deleteEntity="Student(s)"
        deleteWarning="Are you sure you want to delete the selected course?, once deleted, its associated groups and students will be deleted"
        deleteLoader={isDeleting}
        handleDelete={handleDeleteCourse}
      />{' '}
      {/* Delete Course */}
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
                  <Button
                    type="primary"
                    onClick={toggleDeleteConfirmationDialog}
                    disabled={selectedRowKeys.length < 1}
                    style={{ marginBottom: '10px' }}>
                    Delete
                  </Button>
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
                        fetchCourses({
                          page,
                          recordsPerPage: pageSize,
                          ...getValues(),
                        });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.courses}
                    rowSelection={{ type: 'radio', ...rowSelection }}
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

export default CoursesList;
