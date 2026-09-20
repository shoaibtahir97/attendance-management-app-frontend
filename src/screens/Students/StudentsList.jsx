<<<<<<< HEAD
import './Students.css';
import { EllipsisOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Alert, Button, Dropdown, Space, Table, Tag, Tooltip } from 'antd';
=======
import { Box, IconButton, Typography } from '@mui/material';
import { Alert, Button, Dropdown, Table, Tooltip } from 'antd';
>>>>>>> main
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { PiExport } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteConfirmationDialog } from '../../components/DeleteConfirmationDialog';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import { useLazyGetStudentResultReportQuery } from '../../redux/slices/apiSlices/reportApiSlice';
import {
  useDeleteStudentsMutation,
  useLazyGetStudentsQuery,
  useUpdateStudentStatusMutation,
} from '../../redux/slices/apiSlices/studentApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import { generateElem } from '../../utils/generateElements';
import { moduleYears } from '../Courses/AddCourse';
import BulkUploadStudent from './components/BulkUploadStudent';
import SendWarningLetterDialog from './components/SendWarningLetterDialog';
import StudentFilter from './components/StudentFilter';
import './Students.css';
import { UpdateStatusDialog } from './UpdateStatusDialog';

const Students = () => {
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const [getStudents, { isLoading, error }] = useLazyGetStudentsQuery();
  const [getStudentResultReport] = useLazyGetStudentResultReportQuery();
  const [updateStudentStatus] = useUpdateStudentStatusMutation();
  const [deleteStudents, { loading: isDeleting }] = useDeleteStudentsMutation();

  const column = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      render: (text) => <span className="student-id-text">{text}</span>,
    },

    {
      title: 'First Name',
      dataIndex: 'firstName',
      render: (text) => <p className="student-name">{text}</p>,
    },

    {
      title: 'Last Name',
      dataIndex: 'lastName',
      render: (text) => <p className="student-name">{text}</p>,
    },

    {
      title: 'Course',
      dataIndex: 'courseName',
      render: (text) => <div className="student-course">{text}</div>,
    },

    {
      title: 'Group',
      dataIndex: 'group',
      render: (text) => <span className="student-group">{text || '—'}</span>,
    },

    {
      title: 'Year',
      dataIndex: 'year',

      render: (text) => (
        <p style={{ margin: 0 }}>
          {moduleYears.find((module) => module.value == text)?.label || text}
        </p>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',

      render: (text, record) => {
        if (!text) return null;

        const status = text.toLowerCase();

        let statusClass = 'student-status-active';

        if (status === 'inactive') {
          statusClass = 'student-status-inactive';
        }

        if (status === 'suspended') {
          statusClass = 'student-status-suspended';
        }

        if (status === 'graduated') {
          statusClass = 'student-status-graduated';
        }

        return (
          <Tooltip
            title={
              <Box>
                {record?.updatedBy && (
                  <Typography variant="subtitle2" color="white">
                    Updated by: {record.updatedBy}
                  </Typography>
                )}

                {record?.updatedOn && (
                  <Typography variant="subtitle2" color="white">
                    Updated on: {format(record.updatedOn, 'dd MMMM yyyy')}
                  </Typography>
                )}
              </Box>
            }>
            <span className={`student-status ${statusClass}`}>{text}</span>
          </Tooltip>
        );
      },
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      fixed: 'end',
      width: 80,

      render: (text, record) => {
        const items = [
          {
            key: 0,
            label: (
              <Link to={`${PATH_DASHBOARD.studentProfile}/${record._id}`}>
                View Student
              </Link>
            ),
          },

          {
            key: 1,
            label: (
              <Link to={`${PATH_DASHBOARD.studentEdit}/${record._id}`}>
                Edit Student
              </Link>
            ),
          },

          {
            key: 2,
            label: (
              <a
                onClick={() => {
                  setSelectedRowKeys([record?._id]);
                  openUpdateStatusDialog();
                }}>
                Update Status
              </a>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
<<<<<<< HEAD
            <IconButton className="student-action-button">
=======
            <IconButton className="data-action-button">
>>>>>>> main
              <IoMdMore />
            </IconButton>
          </Dropdown>
        );
      },
    },
  ];
  const [studentsQuery, setStudentsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

<<<<<<< HEAD
  // Currently selected student status tab
  const [activeStatusTab, setActiveStatusTab] = useState('all');
=======
  const [isStudentFilterOpen, setIsStudentFilterOpen] = useState(false);
>>>>>>> main
  const [isBulkStudentUploadModalVisible, setIsBulkStudentUploadModalVisible] =
    useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);
  const [isWarningLetterDialogOpen, setIsWarningLetterDialogOpen] =
    useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] =
    useState(false);
  const openDeleteConfirmationDialog = () => {
    setIsDeleteConfirmDialogOpen(!isDeleteConfirmDialogOpen);
  };
  const openUpdateStatusDialog = () => {
    setIsUpdateStatusDialogOpen(!isUpdateStatusDialogOpen);
  };
  const openSendWarningLetterDialog = () =>
    setIsWarningLetterDialogOpen(!isWarningLetterDialogOpen);
  const open = Boolean(anchorEl);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const openAddStudentPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeAddStudentPopover = (event) => {
    setAnchorEl(null);
  };
  const openUploadExcelModal = () =>
    setIsBulkStudentUploadModalVisible(!isBulkStudentUploadModalVisible);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
<<<<<<< HEAD
  const studentQuerySchema = Yup.object().shape({
    studentId: Yup.string().trim(),
    name: Yup.string().trim(),
    group: Yup.string().trim().nullable(),
    status: Yup.string().trim().nullable(),
  });
  const methods = useForm({
    resolver: yupResolver(studentQuerySchema),
  });
  const {
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;
=======
>>>>>>> main
  const fetchStudents = async (query) => {
    await getStudents(query)
      .unwrap()
      .then((res) => {
        const { students, filteredRecordsCount } = res;
        setDataSource({
          students,
          totalRecords: filteredRecordsCount,
        });
      });
  };
  const fetchStudentsByQuery = (data) => {
    const query = {
      page: 1,
      recordsPerPage: studentsQuery.recordsPerPage,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== '' && value != null
        )
      ),
    };
    setStudentsQuery(query);
    fetchStudents(query);
    setIsStudentFilterOpen(false);
  };
  const handleRemoveFilter = (key) => {
    const query = { ...studentsQuery, page: 1 };
    delete query[key];
    setStudentsQuery(query);
    fetchStudents(query);
  };
<<<<<<< HEAD
  const handleStatusTabChange = (status) => {
    setActiveStatusTab(status);
    setSelectedRowKeys([]);

    const query = {
      page: 1,
      recordsPerPage: studentsQuery.recordsPerPage,
    };

    // If "all" is selected, don't send status
    if (status !== 'all') {
      query.status = status;
    }

    setStudentsQuery(query);
    fetchStudents(query);
  };
=======
>>>>>>> main
  const handleDeleteStudents = async () => {
    await deleteStudents({ studentIds: [...selectedRowKeys] })
      .unwrap()
      .then(() => {
        openNotification('success', 'Student(s) deleted successfully');
        setSelectedRowKeys([]);
        fetchStudents(studentsQuery);
        openDeleteConfirmationDialog();
      })

      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };
  const handleUpdateStatus = async (data) => {
    await updateStudentStatus({ ...data })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        setSelectedRowKeys([]);
        fetchStudents(studentsQuery);
        openUpdateStatusDialog();
      })
      .catch((err) => {
        console.log('err', err);
        openNotification('error', err?.data?.message ?? err?.error);
      });
  };
  const handleGenerateStudentResultReport = async () => {
    await getStudentResultReport({
      ...studentsQuery,
    })
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(res);
        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `StudentResultReport.xlsx`);

        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log('err', err);
        openNotification('error', 'Failed to fetch data');
      });
  };
  const studentBulkOptions = [
    {
      label: (
        <a
          onClick={openSendWarningLetterDialog}
          target="_ blank"
          rel="noopener noreferrer">
          Send Warning Letter
        </a>
      ),
      key: '2',
    },
    {
      label: (
        <a
          onClick={openUpdateStatusDialog}
          target="_ blank"
          rel="noopener noreferrer">
          Update Status
        </a>
      ),
      key: '1',
    },
    {
      label: (
        <a
          onClick={openDeleteConfirmationDialog}
          target="_ blank"
          rel="noopener noreferrer">
          Delete
        </a>
      ),
      key: '0',
    },
  ];

  const menuProps = {
    items: studentBulkOptions,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const name = watch('name');

      const query = {
        page: 1,
        recordsPerPage: studentsQuery.recordsPerPage,
      };

      // Keep the currently selected status tab
      if (activeStatusTab !== 'all') {
        query.status = activeStatusTab;
      }

      // Add search text
      if (name && name.trim()) {
        const searchValue = name.trim();

        // If the search value is a number, search by Student ID
        if (/^[0-9\/-]+$/.test(searchValue)) {
          query.studentId = searchValue;
        } else {
          query.name = searchValue;
        }
      }

      setStudentsQuery(query);
      fetchStudents(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [watch('name'), activeStatusTab]);

  return (
    <>
      <DeleteConfirmationDialog
        isShowModal={isDeleteConfirmDialogOpen}
        showModalMethod={openDeleteConfirmationDialog}
        dialogTitle="Delete Student"
        deleteWarning="Are you sure you want to delete the selected student(s)?, once deleted, it cannot be undone."
        deleteLoader={isDeleting}
        handleDelete={handleDeleteStudents}
      />

      {isWarningLetterDialogOpen && (
        <SendWarningLetterDialog
          isShowModal={isWarningLetterDialogOpen}
          showModalMethod={openSendWarningLetterDialog}
          studentIds={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      )}

      <UpdateStatusDialog
        isShowModal={isUpdateStatusDialogOpen}
        showModalMethod={setIsUpdateStatusDialogOpen}
        studentIds={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        handleUpdateStatus={handleUpdateStatus}
      />

<<<<<<< HEAD
      <div className="content container-fluid students-page">
=======
      <div className="content container-fluid data-page students-page">
>>>>>>> main
        {/* Page Header removed */}

        {/* Bulk Upload Modal */}
        {isBulkStudentUploadModalVisible && (
          <BulkUploadStudent
            open={isBulkStudentUploadModalVisible}
            handleClose={openUploadExcelModal}
            fetchStudents={fetchStudents}
          />
        )}
<<<<<<< HEAD

        {/* Search Section */}
=======
>>>>>>> main

        {/* Students Table */}
        <div className="row">
          <div className="col-sm-12">
<<<<<<< HEAD
            <div className="students-table-card">
              {/* Table Header */}
              {/* Students Header */}
              <div className="students-table-header">
                <div className="students-header-top">
                  <div className="students-header-title-area">
                    <div className="students-title-row">
                      <h3 className="students-table-title">Students</h3>
                    </div>
                  </div>

                  <div className="students-header-actions">
                    {/* Add Student */}
                    <Button
                      type="primary"
                      size="large"
=======
            <div className="data-table-card">
              {/* Table Header */}
              {/* Students Header */}
              <div className="data-table-header">
                <div className="students-header-top">
                  <div className="students-header-title-area">
                    <div className="students-title-row">
                      <h3 className="data-table-title">Students</h3>
                    </div>
                  </div>

                  <div className="data-header-actions">
                    {/* Add Student */}
                    <Button
                      type="primary"
>>>>>>> main
                      onClick={() => navigate(PATH_DASHBOARD.studentAdd)}>
                      + Add Student
                    </Button>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
              {/* Student Tabs */}
              <div className="students-tabs">
                {/* All Students */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'all' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('all')}>
                  All Students
                </button>

                {/* Active */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'active' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('active')}>
                  Active
                </button>

                {/* Inactive */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'inactive' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('inactive')}>
                  Inactive
                </button>

                {/* Suspended */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'suspended' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('suspended')}>
                  Suspended
                </button>

                {/* Dropped */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'dropped' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('dropped')}>
                  Dropped
                </button>

                {/* Withdrawn */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'withdrawn' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('withdrawn')}>
                  Withdrawn
                </button>

                {/* Graduated */}
                <button
                  type="button"
                  className={`student-tab ${
                    activeStatusTab === 'graduated' ? 'active' : ''
                  }`}
                  onClick={() => handleStatusTabChange('graduated')}>
                  Graduated
                </button>
              </div>

              <div className="subframe-search-section">
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(fetchStudentsByQuery)}>
                  <div className="subframe-search">
                    {/* Search by Name / ID */}
                    <div className="subframe-search-input">
                      <RHFTextField
                        name="name"
                        placeholder="Search by name or ID..."
                      />
                    </div>

                    {/* Add Filter */}
                    <Button type="default" size="large">
                      + Add Filter
                    </Button>

                    {/* Clear Filters */}
                    <button
                      type="button"
                      className="clear-filters"
                      onClick={() => {
                        methods.reset({
                          name: '',
                          studentId: '',
                          group: '',
                          status: '',
                        });

                        setStudentsQuery({
                          page: 1,
                          recordsPerPage: 10,
                        });

                        setActiveStatusTab('all');

                        fetchStudents({
                          page: 1,
                          recordsPerPage: 10,
                        });
                      }}>
                      Clear all
                    </button>

                    {/* Hidden Submit */}
                    <button type="submit" style={{ display: 'none' }}>
                      Search
                    </button>
                  </div>
                </FormProvider>
              </div>

              {/* Table Content */}
              <div className="students-table-wrapper">
=======
              <StudentFilter
                open={isStudentFilterOpen}
                query={studentsQuery}
                onClose={() => setIsStudentFilterOpen(!isStudentFilterOpen)}
                onSubmit={fetchStudentsByQuery}
                onRemoveFilter={handleRemoveFilter}
                clearFilters={() => {
                  const query = { page: 1, recordsPerPage: 10 };
                  setStudentsQuery(query);
                  fetchStudents(query);
                }}
              />

              {/* Table Content */}
              <div className="data-table-wrapper">
>>>>>>> main
                {isLoading ? (
                  generateElem(<TableSkeleton columns={column} />)
                ) : error ? (
                  <Alert
                    message="Error"
                    description={error?.data?.message || error?.error}
                    type="error"
                    showIcon
                  />
                ) : (
                  <>
                    {/* Bulk Selection Actions */}
                    {selectedRowKeys.length > 0 && (
<<<<<<< HEAD
                      <div className="students-selection-toolbar">
                        {/* Selected count */}
                        <div className="students-selected-count">
=======
                      <div className="data-selection-toolbar">
                        {/* Selected count */}
                        <div className="data-selected-count">
>>>>>>> main
                          <span>
                            {selectedRowKeys.length}{' '}
                            {selectedRowKeys.length === 1
                              ? 'student'
                              : 'students'}{' '}
                            selected
                          </span>
                        </div>

                        {/* Actions */}
<<<<<<< HEAD
                        <div className="students-selection-actions">
                          {/* Export */}
                          <Button
                            type="default"
                            className="students-selection-button"
=======
                        <div className="data-selection-actions">
                          {/* Export */}
                          <Button
                            type="default"
                            className="data-selection-button"
>>>>>>> main
                            icon={<PiExport />}
                            onClick={handleGenerateStudentResultReport}>
                            Export
                          </Button>

                          {/* Send Email */}
                          <Button
                            type="default"
<<<<<<< HEAD
                            className="students-selection-button"
=======
                            className="data-selection-button"
>>>>>>> main
                            onClick={openSendWarningLetterDialog}>
                            Send Email
                          </Button>

                          {/* Delete */}
                          <Button
                            danger
                            type="default"
<<<<<<< HEAD
                            className="students-selection-button students-delete-button"
=======
                            className="data-selection-button data-delete-button"
>>>>>>> main
                            onClick={openDeleteConfirmationDialog}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Students Table */}
                    <Table
<<<<<<< HEAD
                      className="students-ant-table"
=======
                      className="data-ant-table"
>>>>>>> main
                      pagination={{
                        total: dataSource?.totalRecords,

                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,

                        showSizeChanger: true,

                        onShowSizeChange: onShowSizeChange,

                        itemRender: itemRender,

                        onChange: (page, pageSize) => {
                          setSelectedRowKeys([]);

                          const query = {
<<<<<<< HEAD
                            page,
                            recordsPerPage: pageSize,
                          };

                          // Keep the currently selected status when changing pages
                          if (activeStatusTab !== 'all') {
                            query.status = activeStatusTab;
                          }

                          // Keep search form values
                          const formValues = getValues();

                          if (formValues.name) {
                            query.name = formValues.name;
                          }

                          if (formValues.studentId) {
                            query.studentId = formValues.studentId;
                          }

                          if (formValues.group) {
                            query.group = formValues.group;
                          }
=======
                            page,
                            recordsPerPage: pageSize,
                          };

                          Object.assign(query, {
                            ...studentsQuery,
                            page,
                            recordsPerPage: pageSize,
                          });
>>>>>>> main

                          setStudentsQuery(query);
                          fetchStudents(query);
                        },
                      }}
                      columns={column}
                      dataSource={dataSource?.students}
                      rowSelection={rowSelection}
                      rowKey={(record) => record._id}
                      scroll={{ x: 'max-content' }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
