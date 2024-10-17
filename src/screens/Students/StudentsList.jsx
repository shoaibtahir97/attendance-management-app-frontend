import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Table, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../../components/Pagination';
import { useState } from 'react';
import {
  useDeleteStudentsMutation,
  useLazyGetStudentsQuery,
} from '../../redux/slices/apiSlices/studentApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import PageHeader from '../../components/PageHeader';
import { apiSlice } from '../../redux/slices/apiSlices/apiSlice';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';
import { MdDelete } from 'react-icons/md';
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
} from '@mui/material';
import TableSkeleton from '../../components/TableSkeleton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { formatDate } from 'date-fns';
import { getFormattedDate } from '../../utils/formatDateTime';
import { moduleYears } from '../Courses/AddCourse';
import BulkUploadStudent from './components/BulkUploadStudent';
import { useSelector } from 'react-redux';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import useNotification from '../../hooks/useNotification';
import { X } from 'react-feather';

export const column = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    sorter: (a, b) => a.studentId.length - b.studentId.length,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    render: (text, record) => <h2 className="table-avatar">{text}</h2>,
  },

  {
    title: 'Last Name',
    dataIndex: 'lastName',
    sorter: (a, b) => a.lastName.length - b.lastName.length,
    render: (text, record) => <h2 className="table-avatar">{text}</h2>,
  },
  {
    title: 'Course',
    dataIndex: 'courseName',
    sorter: (a, b) => a.courseName.length - b.courseName.length,
  },
  {
    title: 'Group',
    dataIndex: 'group',
    sorter: (a, b) => a.group.length - b.group.length,
  },
  {
    title: 'Phone ',
    dataIndex: 'phone',
    sorter: (a, b) => a.phone.length - b.phone.length,
  },
  {
    title: 'Email ',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'DOB',
    dataIndex: 'DOB',
    sorter: (a, b) => a.DOB.length - b.DOB.length,
    render: (text, record) => <p>{getFormattedDate(text, 'DD-MM-YYYY')}</p>,
  },
  {
    title: 'Nationality',
    dataIndex: 'nationality',
    sorter: (a, b) => a.nationality.length - b.nationality.length,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    sorter: (a, b) => a.year.length - b.year.length,
    render: (text, record) => (
      <p>
        {moduleYears.map((module) => {
          if (module.value == text) {
            return module.label;
          }
        })}
      </p>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    render: (text, record) => (
      <>
        <div className="actions">
          <Link
            to={`${PATH_DASHBOARD.studentEdit}/${record._id}`}
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

export const SKELETON = ['', '', '', '', ''];

const Students = () => {
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const [getStudents, { data, isLoading, error }] = useLazyGetStudentsQuery();
  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();
  const [deleteStudents, { loading: isDeleting }] = useDeleteStudentsMutation();

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
  const [isBulkStudentUploadModalVisible, setIsBulkStudentUploadModalVisible] =
    useState(false);
  const [isDeleteConfirmDialogOpen, setIsDeleteConfirmDialogOpen] =
    useState(false);

  const openDeleteConfirmationDialog = () => {
    setIsDeleteConfirmDialogOpen(!isDeleteConfirmDialogOpen);
  };

  const open = Boolean(anchorEl);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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

  const studentQuerySchema = Yup.object().shape({
    studentId: Yup.string().trim(),
    name: Yup.string().trim(),
    group: Yup.string().trim().nullable(),
  });

  const methods = useForm({
    resolver: yupResolver(studentQuerySchema),
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const fetchStudents = async (query) => {
    await getStudents(query)
      .unwrap()
      .then((res) => {
        const { students, totalRecordsCount, filteredRecordsCount } = res;
        setDataSource({
          students: students,
          totalRecords: filteredRecordsCount,
        });
      });
  };

  const fetchStudentsByQuery = (data) => {
    fetchStudents({ ...data });
  };

  const handleDeleteStudents = async () => {
    await deleteStudents({ studentIds: [...selectedRowKeys] })
      .unwrap()
      .then(() => {
        openNotification('success', 'Student(s) deleted successfully');
        fetchStudents(studentsQuery);
        openDeleteConfirmationDialog();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
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
        // deleteEntity="Student(s)"
        deleteWarning="Are you sure you want to delete the selected student(s)?, once deleted, it cannot be undone."
        deleteLoader={isDeleting}
        handleDelete={handleDeleteStudents}
      />
      <div className="content container-fluid">
        {/* Page Header  */}
        <PageHeader
          currentSection="All Students"
          pageTitle="Students"
          parentRoute={PATH_DASHBOARD.students}
          parentSection="Student"
        />
        {isBulkStudentUploadModalVisible && (
          <BulkUploadStudent
            open={isBulkStudentUploadModalVisible}
            handleClose={openUploadExcelModal}
            fetchStudents={fetchStudents}
          />
        )}
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
              <RHFAutocomplete
                name="group"
                label="Group"
                options={groupsList}
              />
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
                      <Tooltip title="Register Student">
                        <Link
                          onClick={openAddStudentPopover}
                          // to={PATH_DASHBOARD.studentAdd}
                          className="btn btn-primary">
                          <i className="fas fa-plus" />
                        </Link>
                      </Tooltip>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeAddStudentPopover}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem
                          onClick={() => {
                            closeAddStudentPopover();
                            navigate(PATH_DASHBOARD.studentAdd);
                          }}>
                          Register Student
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            closeAddStudentPopover();
                            openUploadExcelModal();
                          }}>
                          Bulk Student Registration
                        </MenuItem>
                      </Menu>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="Delete Student(s)">
                        <IconButton
                          type="primary"
                          onClick={openDeleteConfirmationDialog}
                          disabled={selectedRowKeys.length === 0} // Disable if no rows selected
                        >
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </Box>
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
                            ...getValues(),
                          });
                        },
                      }}
                      columns={column}
                      dataSource={dataSource.students}
                      rowSelection={rowSelection}
                      rowKey={(record) => record._id}
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
