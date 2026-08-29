import { IconButton, Tooltip } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FiEdit, FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import { useLazyGetUsersQuery } from '../../redux/slices/apiSlices/usersApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import BulkUploadTeacher from './components/BulkUploadTeacher';
import TeacherFilter from './components/TeacherFilter';
import './teachers.css';

const SKELETON = ['', '', '', '', ''];

const TeachersList = () => {
  const navigate = useNavigate();
  const [getUsers, { isLoading, error }] = useLazyGetUsersQuery();

  const [usersQuery, setUsersQuery] = useState({
    page: 1,
    recordsPerPage: 10,
    role: 'teacher',
  });

  const [dataSource, setDataSource] = useState({
    users: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isTeacherFilterOpen, setIsTeacherFilterOpen] = useState(false);
  const [isBulkTeacherUploadModalVisible, setIsBulkTeacherUploadModalVisible] =
    useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const openUploadExcelModal = () =>
    setIsBulkTeacherUploadModalVisible(!isBulkTeacherUploadModalVisible);

  const column = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      render: (text) => <span className="teacher-name">{text}</span>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      render: (text) => <span className="teacher-name">{text}</span>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      render: (text) => <span className="teacher-email">{text}</span>,
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
      width: 90,
      render: (text, record) => (
        <div className="teacher-action">
          <Tooltip title="View Teacher" placement="top">
            <Link
              to={`${PATH_DASHBOARD.teacherProfile}/${record._id}`}
              className="data-action-button">
              <IconButton component="span">
                <FiEye size={16} />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit Teacher" placement="top">
            <Link
              to={`${PATH_DASHBOARD.teacherEdit}/${record._id}`}
              className="data-action-button">
              <IconButton component="span">
                <FiEdit size={16} />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchUsers = async (query) => {
    await getUsers(query)
      .unwrap()
      .then((res) => {
        const { users, filteredUsers } = res;
        setDataSource({
          users,
          totalRecords: filteredUsers,
        });
      });
  };

  const fetchUsersByQuery = (data) => {
    const query = {
      page: 1,
      recordsPerPage: usersQuery.recordsPerPage,
      role: 'teacher',
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== '' && value != null
        )
      ),
    };

    setUsersQuery(query);
    fetchUsers(query);
    setIsTeacherFilterOpen(false);
  };

  const handleRemoveFilter = (key) => {
    const query = { ...usersQuery, page: 1 };
    delete query[key];
    setUsersQuery(query);
    fetchUsers(query);
  };

  const clearFilters = () => {
    const query = { page: 1, recordsPerPage: 10, role: 'teacher' };
    setUsersQuery(query);
    fetchUsers(query);
  };

  useEffect(() => {
    fetchUsers(usersQuery);
  }, []);

  return (
    <div className="content container-fluid data-page teachers-page">
      {isBulkTeacherUploadModalVisible && (
        <BulkUploadTeacher
          open={isBulkTeacherUploadModalVisible}
          handleClose={openUploadExcelModal}
          fetchStudents={fetchUsers}
        />
      )}

      <div className="data-table-card">
        <div className="data-table-header">
          <h3 className="data-table-title">Teachers</h3>

          <div className="data-header-actions">
            <Button
              type="primary"
              onClick={() => navigate(PATH_DASHBOARD.teacherAdd)}>
              + Add Teacher
            </Button>
          </div>
        </div>

        <TeacherFilter
          open={isTeacherFilterOpen}
          query={usersQuery}
          onOpen={() => setIsTeacherFilterOpen(true)}
          onClose={() => setIsTeacherFilterOpen(false)}
          onSubmit={fetchUsersByQuery}
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
                total: dataSource.totalRecords,
                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                showSizeChanger: true,
                onShowSizeChange: onShowSizeChange,
                itemRender: itemRender,
                onChange: (page, pageSize) => {
                  const query = {
                    ...usersQuery,
                    page,
                    recordsPerPage: pageSize,
                  };

                  setUsersQuery(query);
                  fetchUsers(query);
                },
              }}
              columns={column}
              dataSource={dataSource.users}
              rowSelection={rowSelection}
              rowKey={(record) => record._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TeachersList;
