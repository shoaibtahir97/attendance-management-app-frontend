import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { Button, Table } from 'antd';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import { useGetGroupsListQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { useLazyGetGroupAttendanceReportQuery } from '../../redux/slices/apiSlices/reportApiSlice';
import useNotification from '../../hooks/useNotification';
import GroupAttendanceChart from './GroupAttendanceChart';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { useGetStudentsListQuery } from '../../redux/slices/apiSlices/studentApiSlice';

export const attendanceStatusOptions = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Late', value: 'late' },
];

export const column = [
  {
    title: 'Subject',
    dataIndex: 'subject',
    sorter: (a, b) => a.subject.length - b.subject.length,
  },
  {
    title: 'Total classes',
    dataIndex: 'totalClasses',
    sorter: (a, b) => a.totalClasses.length - b.totalClasses.length,
  },
  {
    title: 'Present',
    dataIndex: 'present',
    sorter: (a, b) => a.present.length - b.present.length,
  },
  {
    title: 'Absent',
    dataIndex: 'absent',
    sorter: (a, b) => a.absent.length - b.absent.length,
  },
  {
    title: 'Leave',
    dataIndex: 'leave',
    sorter: (a, b) => a.leave.length - b.leave.length,
  },
  {
    title: 'Attendance (%)',
    dataIndex: 'attendancePercentage',
    sorter: (a, b) =>
      a.attendancePercentage.length - b.attendancePercentage.length,
    render: (text) => <>{text}%</>,
  },
];

const StudentReport = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { data: studentsList } = useGetStudentsListQuery();
  const [
    getGroupAttendanceReport,
    { isLoading: loadingGetGroupAttendanceReport },
  ] = useLazyGetGroupAttendanceReportQuery();

  const { openNotification } = useNotification();

  const [dataSource, setDataSource] = useState([]);

  const getStudentReports = async (data) => {
    await getGroupAttendanceReport({
      ...data,
      startDate: new Date(data?.startDate),
      endDate: new Date(data?.endDate),
    })
      .unwrap()
      .then((res) => {
        setDataSource(res);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(getStudentReports)}>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 mt-2 ">
            <RHFAutocomplete
              label="Subject"
              name="subject"
              multiple
              sx={{ width: '100%' }}
              size="small"
              options={studentsList}
            />
          </div>

          <div className="col-xs-12 col-sm-6 col-md-3 mt-2">
            <RHFDatePicker
              label="Start date"
              name="startDate"
              sx={{ width: '100%' }}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 mt-2">
            <RHFDatePicker
              label="End date"
              name="endDate"
              sx={{ width: '100%' }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className=" d-flex justify-content-end">
            <Button
              loading={loadingGetGroupAttendanceReport}
              htmlType="submit"
              type="primary">
              Generate Report
            </Button>
          </div>
        </div>
      </FormProvider>

      <div className="row">
        <div className="col-xs-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
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
                    total: dataSource.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                  }}
                  columns={column}
                  dataSource={dataSource}
                  rowKey={(record) => record.studentId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <GroupAttendanceChart reportData={dataSource} />
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
