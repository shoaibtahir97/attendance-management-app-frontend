import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Table, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../../components/Pagination';
import { useState } from 'react';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import PageHeader from '../../components/PageHeader';
import { apiSlice } from '../../redux/slices/apiSlices/apiSlice';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/HookForm';
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
  const navigate = useNavigate();
  const [studentsQuery, setStudentsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });
  const [getStudents, { data, isLoading, error }] = useLazyGetStudentsQuery();

  const [dataSource, setDataSource] = useState({
    students: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isBulkStudentUploadModalVisible, setIsBulkStudentUploadModalVisible] =
    useState(false);
  const open = Boolean(anchorEl);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
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

  const studentQuerySchema = Yup.object().shape({
    studentId: Yup.string().trim(),
    name: Yup.string().trim(),
    group: Yup.string().trim(),
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
        setDataSource({
          students: students,
          totalRecords: filteredRecordsCount,
        });
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
              <RHFTextField name="group" label="Group" />
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
