import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormProvider,
  RHFCheckbox,
  RHFMultiCheckbox,
  RHFRadioGroup,
} from '../../HookForm';
import {
  img1,
  img10,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
} from '../../imagepath';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { Table } from 'antd';
import { itemRender, onShowSizeChange } from '../../Pagination';
import RHFSelect from '../../HookForm/RHFSelect';
import { MenuItem } from '@mui/material';

export const datasource = [
  {
    Id: '1',
    StudentId: 'PRE2209',
    Name: 'Aaliyah',
    Img: img1,
    Class: '10 A',
    Attendance: 95,
    MobileNumber: '097 3584 5870',
    Address: '911 Deer Ridge Drive,USA',
    Action: '',
  },
  {
    Id: '2',
    StudentId: 'PRE2213',
    Name: 'Malynne',
    Img: img3,
    Class: '8 A',
    Attendance: 71,
    MobileNumber: '242 362 3100',
    Address: 'Bacardi Rd P.O. Box N-4880, New Providence',
    Action: '',
  },
  {
    Id: '3',
    StudentId: 'PRE2143',
    Name: 'Levell Scott',
    Img: img2,
    Class: '10 A',
    Attendance: 81,
    MobileNumber: '026 7318 4366',
    Address: 'P.O. Box: 41, Gaborone',
    Action: '',
  },
  {
    Id: '4',
    StudentId: 'PRE2431',
    Name: 'Minnie',
    Img: img3,
    Class: '11 C',
    Attendance: 79,
    MobileNumber: '952 512 4909',
    Address: '4771  Oral Lake Road, Golden Valley',
    Action: '',
  },
  {
    Id: '5',
    StudentId: 'PRE1534',
    Name: 'Lois A',
    Img: img4,
    Class: '10 A',
    Attendance: 74,
    MobileNumber: '413 289 1314',
    Address: '2844 Leverton Cove Road, Palmer',
    Action: '',
  },
  {
    Id: '6',
    StudentId: 'PRE2153',
    Name: 'Calvin',
    Img: img5,
    Class: '9 B',
    Attendance: 85,
    MobileNumber: '701 753 3810',
    Address: '1900  Hidden Meadow Drive, Crete',
    Action: '',
  },
  {
    Id: '7',
    StudentId: 'PRE1252',
    Name: 'Joe Kelley',
    Img: img6,
    Class: '11 C',
    Attendance: 49,
    MobileNumber: '402 221 7523',
    Address: '3979  Ashwood Drive, Omaha',
    Action: '',
  },
  {
    Id: '8',
    StudentId: 'PRE1434',
    Name: 'Vincent',
    Img: img7,
    Class: '10 A',
    Attendance: 74,
    MobileNumber: '402 221 7523',
    Address: '3979  Ashwood Drive, Omaha',
    Action: '',
  },
  {
    Id: '9',
    StudentId: 'PRE2345',
    Name: 'Kozma  Tatari',
    Img: img8,
    Class: '9 A',
    Attendance: 85,
    MobileNumber: '04 2239 968',
    Address: 'Rruga E Kavajes, Condor Center, Tirana',
    Action: '',
  },
  {
    Id: '10',
    StudentId: 'PRE2365',
    Name: 'John Chambers',
    Img: img9,
    Class: '11 B',
    Attendance: 69,
    MobileNumber: '870 663 2334',
    Address: '4667 Sunset Drive, Pine Bluff',
    Action: '',
  },
  {
    Id: '11',
    StudentId: 'PRE1234',
    Name: 'Nathan Humphries',
    Img: img10,
    Class: '10 B',
    Attendance: 100,
    MobileNumber: '077 3499 9959',
    Address: '86 Lamphey Road, Thelnetham',
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
          <Link to='/studentsview' className='avatar avatar-sm me-2 '>
            <img
              className='avatar-img rounded-circle'
              src={record.Img}
              alt='User Image'
            />
          </Link>
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
    title: 'Attendance',
    dataIndex: 'Attendance',
    sorter: (a, b) => a.Attendance.length - b.Attendance.length,
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

const timelineOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'End of Term', value: 'endOfTerm' },
];

const attendanceStatusOptions = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Late', value: 'late' },
];

const warningLettersIssued = [
  { label: 'First Warning Letter', value: 0 },
  { label: 'Second Warning Letter', value: 1 },
  { label: 'Third Warning Letter', value: 2 },
];

const groups = [
  { label: 'Group A', value: 'A' },
  { label: 'Group B', value: 'B' },
  { label: 'Group C', value: 'C' },
  { label: 'Group D', value: 'D' },
];

const AttendanceReports = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const filterSchema = Yup.object().shape({
    timeline: Yup.string(),
    attendanceStatus: Yup.array().of(Yup.string()),
    warningLettersIssued: Yup.array().of(Yup.string()),
    courses: Yup.array().of(Yup.string()),
    groups: Yup.array().of(Yup.string()),
  });

  const defaultValues = {
    timeline: '',
    attendanceStatus: [],
    warningLettersIssued: [],
    courses: [],
    groups: [],
  };

  const methods = useForm({
    resolver: yupResolver(filterSchema),
    defaultValues,
  });

  const { handleSubmit, getValues } = methods;

  const getReports = (data) => {
    console.log(data);
  };

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
        <div className='page-header'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-sub-header'>
                <h3 className='page-title'>Attendance Reports</h3>
                {/* <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/dashboard">Attendance</Link>
                  </li>
                  <li class="breadcrumb-item active">Attendance</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <div className='card comman-shadow p-2'>
            <div className='card-body'>
              <div className='card-title'>Filters</div>
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(getReports)}
              >
                <div className='row'>
                  <div className='col-6'>
                    <p className=''>Attendance Status</p>
                    <RHFSelect
                      name='attendanceStatus'
                      multiple
                      sx={{ width: '100%' }}
                      size='small'
                    >
                      {attendanceStatusOptions.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                          {item?.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                  <div className='col-6'>
                    <p className=''>Timeline</p>
                    <RHFRadioGroup name='timeline' options={timelineOptions} />
                  </div>
                  <div className='col-6'>
                    <p>Warning letters issued</p>
                    <RHFSelect
                      name='warningLettersIssued'
                      multiple
                      sx={{ width: '100%' }}
                      size='small'
                    >
                      {warningLettersIssued.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                  <div className='col-6'>
                    <p>Group</p>
                    <RHFSelect
                      name='groups'
                      multiple
                      sx={{ width: '100%' }}
                      size='small'
                    >
                      {groups.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className=' d-flex justify-content-end'>
                    <button
                      type='submit'
                      className='btn btn-primary btn-sm py-2 px-4 text-center'
                    >
                      Search
                    </button>
                  </div>
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <div className='card card-table comman-shadow'>
            <div className='card-body'>
              {/* Page Header */}
              <div className='page-header'>
                <div className='row align-items-center'>
                  <div className='col'>
                    <h3 className='page-title'>Attendance</h3>
                  </div>
                  <div className='col-auto text-end float-end ms-auto download-grp'>
                    <Link to='#' className='btn btn-outline-primary me-2'>
                      <i className='fas fa-download' /> Download
                    </Link>
                  </div>
                </div>
              </div>
              <div className='table-responsive'>
                <Table
                  pagination={{
                    total: datasource.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  columns={column}
                  dataSource={datasource.map((data, ind) => ({
                    ...data,
                    Attendance: `${data?.Attendance} %`,
                  }))}
                  rowSelection={rowSelection}
                  rowKey={(record) => record.Id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;
