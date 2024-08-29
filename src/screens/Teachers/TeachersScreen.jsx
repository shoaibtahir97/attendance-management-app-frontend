import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useLazyGetStudentsQuery } from '../../redux/slices/studentApiSlice';
import { itemRender, onShowSizeChange } from '../../components/Pagination';

const TeachersScreen = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const datasource = [
  //   {
  //     ID: '1',
  //     TeachersID: 'PRE2209',
  //     Img: avatar02,
  //     Name: 'Aaliyah',
  //     Class: 10,
  //     Gender: 'Female',
  //     Subject: 'Mathematics',
  //     Section: 'A',
  //     MobileNumber: '097 3584 5870',
  //     Address: '911 Deer Ridge Drive,USA',
  //     Action: '',
  //   },
  //   {
  //     ID: '2',
  //     TeachersID: 'PRE2213',
  //     Img: avatar03,
  //     Name: 'Malynne',
  //     Class: 8,
  //     Gender: 'Female',
  //     Subject: 'Physics',
  //     Section: 'A',
  //     MobileNumber: '242 362 3100',
  //     Address: 'Bacardi Rd P.O. Box N-4880, New Providence',
  //     Action: '',
  //   },
  //   {
  //     ID: '3',
  //     TeachersID: 'PRE2143',
  //     Img: avatar04,
  //     Name: 'Levell Scott',
  //     Class: 10,
  //     Gender: 'Male',
  //     Subject: 'Science',
  //     Section: 'B',
  //     MobileNumber: '026 7318 4366',
  //     Address: 'P.O. Box: 41, Gaborone',
  //     Action: '',
  //   },
  //   {
  //     ID: '4',
  //     TeachersID: 'PRE2431',
  //     Img: avatar05,
  //     Name: 'Minnie',
  //     Class: 11,
  //     Gender: 'Male',
  //     Subject: 'History',
  //     Section: 'C',
  //     MobileNumber: '952 512 4909',
  //     Address: '4771  Oral Lake Road, Golden Valley',
  //     Action: '',
  //   },
  //   {
  //     ID: '5',
  //     TeachersID: 'PRE1534',
  //     Img: avatar06,
  //     Name: 'Lois A',
  //     Class: 10,
  //     Gender: 'Female',
  //     Subject: 'English',
  //     Section: 'B',
  //     MobileNumber: '413 289 1314',
  //     Address: '2844 Leverton Cove Road, Palmer',
  //     Action: '',
  //   },
  //   {
  //     ID: '6',
  //     TeachersID: 'PRE2153',
  //     Img: avatar07,
  //     Name: 'Calvin',
  //     Class: 9,
  //     Gender: 'Male',
  //     Subject: 'Mathematics',
  //     Section: 'C',
  //     MobileNumber: '701 753 3810',
  //     Address: '1900  Hidden Meadow Drive, Crete',
  //     Action: '',
  //   },
  //   {
  //     ID: '7',
  //     TeachersID: 'PRE1434',
  //     Img: avatar08,
  //     Name: 'Vincent',
  //     Class: 10,
  //     Gender: 'Male',
  //     Subject: 'Mathematics',
  //     Section: 'C',
  //     MobileNumber: '402 221 7523',
  //     Address: '3979  Ashwood Drive, Omaha',
  //     Action: '',
  //   },
  //   {
  //     ID: '8',
  //     TeachersID: 'PRE2345',
  //     Img: avatar09,
  //     Name: 'Kozma  Tatari',
  //     Class: 9,
  //     Gender: 'Female',
  //     Subject: 'Science',
  //     Section: 'A',
  //     MobileNumber: '04 2239 968',
  //     Address: 'Rruga E Kavajes, Condor Center, Tirana',
  //     Action: '',
  //   },
  //   {
  //     ID: '9',
  //     TeachersID: 'PRE2365',
  //     Img: avatar10,
  //     Name: 'John Chambers',
  //     Class: 11,
  //     Gender: 'Male',
  //     Subject: 'Botony',
  //     Section: 'B',
  //     MobileNumber: '870 663 2334',
  //     Address: '4667 Sunset Drive, Pine Bluff',
  //     Action: '',
  //   },
  //   {
  //     ID: '10',
  //     TeachersID: 'PRE1234',
  //     Img: avatar11,
  //     Name: 'Nathan Humphries',
  //     Class: 10,
  //     Gender: 'Male',
  //     Subject: 'Biology',
  //     Section: 'A',
  //     MobileNumber: '077 3499 9959',
  //     Address: '86 Lamphey Road, Thelnetham',
  //     Action: '',
  //   },
  // ];
  const column = [
    {
      title: 'ID',
      dataIndex: '_id',
      sorter: (a, b) => a._id.length - b._id.length,
      // render: (text, record) => (
      //     <>
      //         <Link to="/viewinvoice">{record.TeachersID}</Link>
      //     </>
      // )
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      // render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: 'Group',
      dataIndex: 'groups',
      sorter: (a, b) => a.groups.length - b.groups.length,
    },

    {
      title: 'Subject',
      dataIndex: 'subjects',
      sorter: (a, b) => a.subjects.length - b.subjects.length,
    },

    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => (
        <>
          <div className="actions">
            <Link to="#" className="btn btn-sm bg-success-light me-2">
              <i className="feather-eye">
                <FeatherIcon icon="eye" />
              </i>
            </Link>
            <Link to="/editteacher" className="btn btn-sm bg-danger-light">
              <i className="feather-edit">
                <FeatherIcon icon="edit" className="list-edit" />
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
  const [getUsers, { data, isLoading, error }] = useLazyGetStudentsQuery();

  const [usersQuery, setUsersQuery] = useState({
    page: 1,
    recordsPerPage: 10,
    role: 'teacher',
  });

  const fetchUsersByQuery = (data) => {
    fetchUsers({ ...data, ...usersQuery });
  };

  const usersQuerySchema = Yup.object().shape({
    name: Yup.string().trim(),
    group: Yup.string().trim(),
    phoneNumber: Yup.string().trim(),
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
            <RHFTextField name="name" label="Name" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="group" label="group" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="phoneNumber" label="Phone number" />
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
                    {/* {dataSource.users.length ? (
                      <Link to="#" className="btn btn-outline-primary me-2">
                        <i className="fas fa-download" /> Download
                      </Link>
                    ) : (
                      <></>
                    )} */}
                    <Tooltip title="Add teacher" placement="top">
                      <Link
                        to={PATH_DASHBOARD.teacherAdd}
                        className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
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
                  }}
                  columns={column}
                  dataSource={dataSource.users}
                  rowSelection={rowSelection}
                  rowKey={(record) => record._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersScreen;
