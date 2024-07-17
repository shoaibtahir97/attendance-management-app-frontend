import React, { useState } from 'react';
import { FormProvider, RHFAutocomplete, RHFDatePicker } from '../../HookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { getDay, getFormattedDate } from '../../../utils/formatDateTime';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Empty, Table } from 'antd';
import { itemRender, onShowSizeChange } from '../../Pagination';

const status = ['Present', 'Absent', 'Late'];

export const dataSource = [
  {
    Id: '1',
    StudentId: 'PRE2209',
    Name: 'Aaliyah',
    Img: 'img1',
    Class: '10 A',
    DOB: '2 Feb 2002',
    ParentName: 'Jeffrey Wong',
    MobileNumber: '097 3584 5870',
    Address: '911 Deer Ridge Drive,USA',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '2',
    StudentId: 'PRE2213',
    Name: 'Malynne',
    Img: 'img3',
    Class: '8 A',
    DOB: '3 June 2010',
    ParentName: 'Fields Malynne',
    MobileNumber: '242 362 3100',
    Address: 'Bacardi Rd P.O. Box N-4880, New Providence',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '3',
    StudentId: 'PRE2143',
    Name: 'Levell Scott',
    Img: 'img2',
    Class: '10 A',
    DOB: '12 Apr 2002',
    ParentName: 'Jeffrey Scott',
    MobileNumber: '026 7318 4366',
    Address: 'P.O. Box: 41, Gaborone',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '4',
    StudentId: 'PRE2431',
    Name: 'Minnie',
    Img: 'img3',
    Class: '11 C',
    DOB: '24 Feb 2000',
    ParentName: 'J Shaffer',
    MobileNumber: '952 512 4909',
    Address: '4771  Oral Lake Road, Golden Valley',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '5',
    StudentId: 'PRE1534',
    Name: 'Lois A',
    Img: 'img4',
    Class: '10 A',
    DOB: '22 Jul 2006',
    ParentName: 'Cleary Wong',
    MobileNumber: '413 289 1314',
    Address: '2844 Leverton Cove Road, Palmer',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '6',
    StudentId: 'PRE2153',
    Name: 'Calvin',
    Img: 'img5',
    Class: '9 B',
    DOB: '8 Dec 2003',
    ParentName: 'Minnie J Shaffer',
    MobileNumber: '701 753 3810',
    Address: '1900  Hidden Meadow Drive, Crete',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '7',
    StudentId: 'PRE1252',
    Name: 'Joe Kelley',
    Img: 'img6',
    Class: '11 C',
    DOB: '7 Oct 2000',
    ParentName: 'Vincent Howard',
    MobileNumber: '402 221 7523',
    Address: '3979  Ashwood Drive, Omaha',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '8',
    StudentId: 'PRE1434',
    Name: 'Vincent',
    Img: 'img7',
    Class: '10 A',
    DOB: '4 Jan 2002',
    ParentName: 'Kelley Joe',
    MobileNumber: '402 221 7523',
    Address: '3979  Ashwood Drive, Omaha',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '9',
    StudentId: 'PRE2345',
    Name: 'Kozma  Tatari',
    Img: 'img8',
    Class: '9 A',
    DOB: '1 Feb 2006',
    ParentName: 'Lombardi',
    MobileNumber: '04 2239 968',
    Address: 'Rruga E Kavajes, Condor Center, Tirana',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '10',
    StudentId: 'PRE2365',
    Name: 'John Chambers',
    Img: 'img9',
    Class: '11 B',
    DOB: '13 Sept 2003',
    ParentName: 'Wong Jeffrey',
    MobileNumber: '870 663 2334',
    Address: '4667 Sunset Drive, Pine Bluff',
    Status: 'Absent',
    Action: '',
  },
  {
    Id: '11',
    StudentId: 'PRE1234',
    Name: 'Nathan Humphries',
    Img: 'img10',
    Class: '10 B',
    DOB: '26 Apr 1994',
    ParentName: 'Stephen Marley',
    MobileNumber: '077 3499 9959',
    Address: '86 Lamphey Road, Thelnetham',
    Status: 'Absent',
    Action: '',
  },
];

export const column = [
  {
    title: 'ID',
    dataIndex: 'StudentId',
    sorter: (a, b) => a.StudentId.length - b.StudentId.length,
  },
  {
    title: 'Name',
    dataIndex: 'Name',
    sorter: (a, b) => a.Name.length - b.Name.length,
    render: (text, record) => (
      <>
        <h2 className='table-avatar'>
          {/* <Link to="/studentsview" className="avatar avatar-sm me-2 ">
            <img
              className="avatar-img rounded-circle"
              src={record.Img}
              alt="User Image"
            />
          </Link> */}
          <Link className='text-dark' to='/studentsview'>
            {record.Name}
          </Link>
        </h2>
      </>
    ),
  },
  {
    title: 'Class',
    dataIndex: 'Class',
    sorter: (a, b) => a.Class.length - b.Class.length,
  },
  {
    title: 'DOB',
    dataIndex: 'DOB',
    sorter: (a, b) => a.DOB.length - b.DOB.length,
  },
  {
    title: 'Parent Name',
    dataIndex: 'ParentName',
    sorter: (a, b) => a.ParentName.length - b.ParentName.length,
  },
  {
    title: 'Mobile Number',
    dataIndex: 'MobileNumber',
    sorter: (a, b) => a.MobileNumber.length - b.MobileNumber.length,
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    sorter: (a, b) => a.Address.length - b.Address.length,
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    render: (text, record) => (
      <div role='group' aria-label='Basic mixed styles example'>
        {status?.map((status, index) => (
          <button
            type='button'
            className={`btn btn${record.Status === status ? '' : '-outline'}-${
              status === 'Present'
                ? 'success'
                : status === 'Absent'
                ? 'danger'
                : 'warning'
            } mx-1`}
          >
            {status}
          </button>
        ))}
      </div>
      // <>
      //   <div
      //     class="btn-group"
      //     role="group"
      //     aria-label="Basic mixed styles example"
      //   >
      //     <button type="button" class="btn btn-danger">
      //       Left
      //     </button>
      //     <button type="button" class="btn btn-warning">
      //       Middle
      //     </button>
      //     <button type="button" class="btn btn-success">
      //       Right
      //     </button>
      //   </div>
      // </>
    ),
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    render: (text, record) => (
      <>
        <div className='actions'>
          <Link to='#' className='btn btn-sm bg-success-light me-2'>
            <i className='feather-eye'>
              <FeatherIcon icon='eye' />
            </i>
          </Link>
          <Link to='/editstudent' className='btn btn-sm bg-danger-light'>
            <i className='feather-edit'>
              <FeatherIcon icon='edit' className='list-edit' />
            </i>
          </Link>
        </div>
      </>
    ),
  },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const attendanceSchema = Yup.object().shape({
    date: Yup.string().required(),
    subject: Yup.string().required('Subject is required'),
    group: Yup.string().required('Group is required'),
    status: Yup.string(),
  });

  const defaultValues = {
    date: dayjs(),
    subject: '',
    group: '',
    status: 'Pending',
  };

  const methods = useForm({
    resolver: yupResolver(attendanceSchema),
    defaultValues,
  });
  const { handleSubmit, getValues } = methods;

  const getStudentList = (data) => {
    console.log(data);
    setAttendance(data);
  };
  console.log(defaultValues);

  const courses = [
    { label: 'Business Administration', value: 'Business Administration' },
    { label: 'Accounting', value: 'Accounting' },
    { label: 'Mathematics', value: 'Mathematics' },
  ];

  const groups = [
    { label: 'Group A', value: 'A' },
    { label: 'Group B', value: 'B' },
    { label: 'Group C', value: 'C' },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='content container-fluid'>
      <div className='page-header'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='page-sub-header'>
              <h3 className='page-title'>Attendance</h3>
              {/* <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/students">Attendance</Link>
                  </li>
                  <li class="breadcrumb-item active">Attendance</li>
                </ul> */}
            </div>
          </div>
        </div>
      </div>

      <div className='student-group-form'>
        <FormProvider methods={methods} onSubmit={handleSubmit(getStudentList)}>
          <div className='row'>
            <div className='col-lg-3 col-md-6'>
              <div className='form-group'>
                <RHFDatePicker name='date' />
              </div>
            </div>
            <div className='col-lg-3 col-md-6'>
              <div className='form-group'>
                <RHFAutocomplete
                  name={'group'}
                  label={'Group'}
                  options={groups}
                />
              </div>
            </div>
            <div className='col-lg-4 col-md-6'>
              <div className='form-group'>
                <RHFAutocomplete
                  name='subject'
                  label='Subject'
                  options={courses}
                />
              </div>
            </div>
            <div className='col-lg-2'>
              <div className='search-student-btn '>
                <button type='submit' className='btn btn-primary btn-sm'>
                  Search
                </button>
              </div>
            </div>
          </div>
        </FormProvider>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <div className='card card-table comman-shadow'>
            {attendance ? (
              <div className='card-body'>
                {/* Page Header */}
                <div className='page-header'>
                  <div className='row align-items-center'>
                    <div className='col '>
                      <div className=' d-flex flex-column me-2 pe-2 border-end'>
                        <p className='fs-6'>Subject: {attendance?.subject}</p>
                        <p className='fs-6 text-secondary'>
                          Group - {attendance?.group}
                        </p>
                      </div>
                      <div className=' d-flex flex-column me-2 pe-2 border-end'>
                        <p className='fs-6'>Time: 10:00 AM to 10:45 AM</p>
                        <p className='fs-6 text-secondary'>
                          Week 3 - {getDay(attendance?.date)} -
                          {getFormattedDate(attendance?.date, 'll')}
                        </p>
                      </div>
                      <div className='d-flex flex-column'>
                        <div className='d-flex mb-2'>
                          <p className='fs-6'>Status: </p>{' '}
                          <p className='fs-6 text-warning'>
                            {attendance?.status}
                          </p>
                        </div>
                        <div>
                          <p> {'  '}</p>
                          <p> {'  '}</p>
                        </div>
                      </div>
                    </div>
                    <div className='col-auto text-end float-end ms-auto download-grp'>
                      <Link to='#' className='btn btn-outline-primary me-2'>
                        <i class='fa-solid fa-floppy-disk' /> Save Attendance
                      </Link>
                      <Link to='#' className='btn btn-outline-primary me-2'>
                        <i className='fas fa-download' /> Download
                      </Link>
                      <Link
                        to='/dashboard/addstudent'
                        className='btn btn-primary'
                      >
                        <i className='fas fa-plus' />
                      </Link>
                    </div>
                  </div>
                </div>
                <div class='table-responsive'>
                  <Table
                    pagination={{
                      total: dataSource.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    columns={column}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                    rowKey={(record) => record.Id}
                  />
                </div>
              </div>
            ) : (
              <div className='card-body'>
                <div className='py-400'>
                  <Empty />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Grid container spacing={2}>
        {attendance ? (
          <Grid
            container
            item
            xs={9}
            sx={{
              border: "1px solid #DADBDF",
              p: 1,
              borderRadius: 2,
            }}
          >
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={4}>
                <Typography>Subject: {attendance?.subject}</Typography>
                <Typography variant="body1" color="#82878D">
                  Group: {attendance?.group}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ pl: 1 }}>
                <Typography variant="subtitle1">
                  Time: 10:00 AM to 10:45 AM
                </Typography>
                <Typography variant="body1" color="#82878D">
                  Week 3 - {getDay(attendance?.date)} -
                  {getFormattedDate(attendance?.date, "ll")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="#DFA364" variant="body1">
                  Pending
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 4 }}>
                  Save Attendance
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        ) : (
          <Grid container xs={9}>
            No data
          </Grid>
        )}
      </Grid> */}
    </div>
  );
}
