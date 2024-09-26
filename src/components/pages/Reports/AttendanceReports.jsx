import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormProvider,
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
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
import { MenuItem, Stack } from '@mui/material';
import { useGetGroupsListQuery } from '../../../redux/slices/apiSlices/groupApiSlice';
import { useGetStudentsListQuery } from '../../../redux/slices/apiSlices/studentApiSlice';
import { useLazyGetAttendanceReportQuery } from '../../../redux/slices/apiSlices/reportApiSlice';
import PageHeader from '../../PageHeader';

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
        <h2 className="table-avatar">
          <Link to="/studentsview" className="avatar avatar-sm me-2 ">
            <img
              className="avatar-img rounded-circle"
              src={record.Img}
              alt="User Image"
            />
          </Link>
          <Link className="text-dark" to="/studentsview">
            {record.Name}
          </Link>
        </h2>
      </>
    ),
  },
  {
    title: 'Group',
    dataIndex: 'Class',
    sorter: (a, b) => a.Class.length - b.Class.length,
  },
  {
    title: 'Attendance',
    dataIndex: 'Attendance',
    sorter: (a, b) => a.Attendance.length - b.Attendance.length,
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

const AttendanceReports = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const { data: groupsList, isLoading: loadingGroups } =
    useGetGroupsListQuery();

  const [getAttendanceReports, { data, isLoading, error }] =
    useLazyGetAttendanceReportQuery();

  const [datasource, setDatasource] = useState([]);
  // const {openNotification}  = useNotification()

  const {
    data: studentsList,
    error: studentsError,
    isLoading: loadingStudents,
  } = useGetStudentsListQuery();

  const filterSchema = Yup.object().shape({
    attendanceStatus: Yup.array().of(Yup.string()),
    // warningLettersIssued: Yup.array().of(Yup.string()),
    startDate: Yup.date(),
    endDate: Yup.date(),
    groups: Yup.array().of(Yup.string()),
    student: Yup.string().nullable(),
  });

  const defaultValues = {
    attendanceStatus: [],
    // warningLettersIssued: [],
    courses: [],
    groups: [],
    startDate: new Date(),
    endDate: new Date(),
    student: '',
  };

  const methods = useForm({
    resolver: yupResolver(filterSchema),
    defaultValues,
  });

  const { handleSubmit, getValues } = methods;

  const convertArrayToObj = (array, key) => {
    const newObj = {};
    array.forEach((item, index) => {
      newObj[`${key}[${index}]`] = item;
    });
    return newObj;
  };

  const getReports = async (data) => {
    const { attendanceStatus, groups, ...query } = data;
    const attendanceStatusObj = convertArrayToObj(
      attendanceStatus,
      'attendanceStatus'
    );
    const groupsObj = convertArrayToObj(groups, 'groups');

    await getAttendanceReports({
      ...query,
      ...attendanceStatusObj,
      ...groupsObj,
    })
      .unwrap()
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        // openNotification('error', err?.data?.message || err?.error);
      });
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
    <div className="content container-fluid">
      <div className="page-header">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Attendance Reports</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="card comman-shadow p-2">
            <div className="card-body">
              <div className="card-title">
                <h4>Filters</h4>
              </div>
              <FormProvider
                methods={methods}
                onSubmit={handleSubmit(getReports)}>
                <div className="row">
                  <div className="col-xs-12 col-sm-6 col-md-4 mt-2 ">
                    <RHFAutocomplete
                      label="Attendance Status"
                      name="attendanceStatus"
                      multiple
                      sx={{ width: '100%' }}
                      size="small"
                      options={attendanceStatusOptions}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 mt-2 ">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <RHFDatePicker label="Start date" name="startDate" />
                      <RHFDatePicker label="End date" name="endDate" />
                    </Stack>
                  </div>
                  <div className="col-xs-12 col-sm-6 col-md-4 mt-2">
                    <RHFAutocomplete
                      name="student"
                      label="Student"
                      options={studentsList}
                    />
                  </div>
                  {/* <div className="col-xs-12 col-sm-6 mt-2">
                    <p>Warning letters issued</p>
                    <RHFSelect
                      name="warningLettersIssued"
                      multiple
                      sx={{ width: '100%' }}
                      size="small"
                      options={warningLettersIssued}
                    />
                  </div> */}
                  <div className="col-xs-12 col-sm-6 mt-2 ">
                    <RHFAutocomplete
                      label="Groups"
                      name="groups"
                      multiple
                      sx={{ width: '100%' }}
                      size="small"
                      options={groupsList}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className=" d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm py-2 px-4 text-center">
                      Generate Report
                    </button>
                  </div>
                </div>
              </FormProvider>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Attendance</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link to="#" className="btn btn-outline-primary me-2">
                      <i className="fas fa-download" /> Download
                    </Link>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
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
                  dataSource={datasource?.map((data, ind) => ({
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
