import { Box, IconButton, Typography } from '@mui/material';
import { Alert, Button, Dropdown, Table, Tooltip } from 'antd';
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
      title: 'ID',
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
            <IconButton className="data-action-button">
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

  const [isStudentFilterOpen, setIsStudentFilterOpen] = useState(false);
  const [isBulkStudentUploadModalVisible, setIsBulkStudentUploadModalVisible] =
    useState(false);
  const [
    isStudentRegistrationModalVisible,
    setIsStudentRegistrationModalVisible,
  ] = useState(false);
  const openStudentRegistrationModal = () => {
    setIsStudentRegistrationModalVisible(true);
  };

  const closeStudentRegistrationModal = () => {
    setIsStudentRegistrationModalVisible(false);
  };

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
    fetchStudents(studentsQuery);
  }, []);

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

      <div className="content container-fluid data-page students-page">
        {/* Page Header removed */}

        {/* Bulk Upload Modal */}
        {isBulkStudentUploadModalVisible && (
          <BulkUploadStudent
            open={isBulkStudentUploadModalVisible}
            handleClose={openUploadExcelModal}
            fetchStudents={fetchStudents}
          />
        )}

        {/* Students Table */}
        <div className="row">
          <div className="col-sm-12">
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
                      onClick={() => navigate(PATH_DASHBOARD.studentAdd)}>
                      + Add Student
                    </Button>
                  </div>
                </div>
              </div>
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
                      <div className="data-selection-toolbar">
                        {/* Selected count */}
                        <div className="data-selected-count">
                          <span>
                            {selectedRowKeys.length}{' '}
                            {selectedRowKeys.length === 1
                              ? 'student'
                              : 'students'}{' '}
                            selected
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="data-selection-actions">
                          {/* Export */}
                          <Button
                            type="default"
                            className="data-selection-button"
                            icon={<PiExport />}
                            onClick={handleGenerateStudentResultReport}>
                            Export
                          </Button>

                          {/* Send Email */}
                          <Button
                            type="default"
                            className="data-selection-button"
                            onClick={openSendWarningLetterDialog}>
                            Send Email
                          </Button>

                          {/* Delete */}
                          <Button
                            danger
                            type="default"
                            className="data-selection-button data-delete-button"
                            onClick={openDeleteConfirmationDialog}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Students Table */}
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
                          setSelectedRowKeys([]);

                          const query = {
                            page,
                            recordsPerPage: pageSize,
                          };

                          Object.assign(query, {
                            ...studentsQuery,
                            page,
                            recordsPerPage: pageSize,
                          });

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
