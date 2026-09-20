import { IconButton, Tooltip } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../../components/DeleteConfirmationDialog';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import {
  useDeleteCourseMutation,
  useLazyGetCoursesQuery,
} from '../../redux/slices/apiSlices/courseApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import CourseFilter from './components/CourseFilter';
import './courses.css';

const SKELETON = ['', '', '', '', ''];

const CoursesList = () => {
  const [getCourses, { isLoading, error }] = useLazyGetCoursesQuery();
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();
  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [coursesQuery, setCoursesQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const [dataSource, setDataSource] = useState({
    courses: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isCourseFilterOpen, setIsCourseFilterOpen] = useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  const toggleDeleteConfirmationDialog = () => {
    if (isDeleteConfirmDialogOpen) {
      setSelectedRowKeys([]);
    }
    setIsDeleteConfirmDialogOpen(!isDeleteConfirmDialogOpen);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <span className="course-name">{text}</span>,
    },
    {
      title: 'Intake',
      dataIndex: 'intake',
      sorter: (a, b) => a.intake.length - b.intake.length,
      render: (text) => (
        <span className="course-intake">
          {text ? format(text, 'MMM yyyy') : '-'}
        </span>
      ),
    },
    {
      title: 'Students',
      dataIndex: 'students',
      sorter: (a, b) => a.students.length - b.students.length,
      render: (text) => <span className="course-students">{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: 90,
      render: (text, record) => {
        const onEditCourse = () => {
          navigate(`${PATH_DASHBOARD.courseEdit}/${record._id}`);
        };

        return (
          <div className="course-action">
            <Tooltip title="Edit Course" placement="top">
              <IconButton onClick={onEditCourse} className="data-action-button">
                <FiEdit size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Course" placement="top">
              <IconButton
                className="data-action-button"
                onClick={() => {
                  setSelectedRowKeys([record._id]);
                  toggleDeleteConfirmationDialog();
                }}>
                <FiTrash size={16} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

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
    const intake = dayjs(data.intake).isValid()
      ? dayjs(data.intake).startOf('month').format('YYYY-MM-DD')
      : undefined;

    const query = {
      page: 1,
      recordsPerPage: coursesQuery.recordsPerPage,
      ...Object.fromEntries(
        Object.entries({ ...data, intake }).filter(
          ([, value]) => value !== '' && value != null
        )
      ),
    };

    setCoursesQuery(query);
    fetchCourses(query);
    setIsCourseFilterOpen(false);
  };

  const handleRemoveFilter = (key) => {
    const query = { ...coursesQuery, page: 1 };
    delete query[key];
    setCoursesQuery(query);
    fetchCourses(query);
  };

  const clearFilters = () => {
    const query = { page: 1, recordsPerPage: 10 };
    setCoursesQuery(query);
    fetchCourses(query);
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
    <div className="content container-fluid data-page courses-page">
      <DeleteConfirmationDialog
        isShowModal={isDeleteConfirmDialogOpen}
        showModalMethod={toggleDeleteConfirmationDialog}
        dialogTitle="Delete Course"
        deleteWarning="Are you sure you want to delete the selected course?, once deleted, its associated groups and students will be deleted"
        deleteLoader={isDeleting}
        handleDelete={handleDeleteCourse}
      />

      <div className="data-table-card">
        <div className="data-table-header">
          <h3 className="data-table-title">Courses</h3>

          <div className="data-header-actions">
            <Button
              type="primary"
              onClick={() => navigate(PATH_DASHBOARD.courseAdd)}>
              + Add Course
            </Button>
          </div>
        </div>

        <CourseFilter
          open={isCourseFilterOpen}
          query={coursesQuery}
          onOpen={() => setIsCourseFilterOpen(true)}
          onClose={() => setIsCourseFilterOpen(false)}
          onSubmit={fetchCoursesByQuery}
          onRemoveFilter={handleRemoveFilter}
          clearFilters={clearFilters}
        />

        <div className="data-table-wrapper">
          {isLoading ? (
            SKELETON.map((_, index) => (
              <TableSkeleton key={index} columns={column} />
            ))
          ) : error ? (
            <Alert
              message="Error"
              description={error?.data?.message || error?.error}
              type="error"
              showIcon
            />
          ) : (
            <Table
              className="data-ant-table"
              pagination={{
                total: dataSource?.totalRecords,

                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,

                showSizeChanger: true,

                onShowSizeChange: onShowSizeChange,

                itemRender: itemRender,

                onChange: (page, pageSize) => {
                  const query = {
                    ...coursesQuery,
                    page,
                    recordsPerPage: pageSize,
                  };

                  setCoursesQuery(query);
                  fetchCourses(query);
                },
              }}
              columns={column}
              dataSource={dataSource.courses}
              rowSelection={rowSelection}
              rowKey={(record) => record._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesList;
