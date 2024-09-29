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
import {
  useLazyDownloadGroupAttendanceReportQuery,
  useLazyGetGroupAttendanceReportQuery,
} from '../../redux/slices/apiSlices/reportApiSlice';
import useNotification from '../../hooks/useNotification';
import GroupAttendanceChart from './GroupAttendanceChart';
import { useGetSubjectsListQuery } from '../../redux/slices/apiSlices/subjectApiSlice';

export const attendanceStatusOptions = [
  { label: 'Present', value: 'present' },
  { label: 'Absent', value: 'absent' },
  { label: 'Late', value: 'late' },
];

export const column = [
  {
    title: 'ID',
    dataIndex: 'studentId',
    sorter: (a, b) => a.studentId.length - b.studentId.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Total classes',
    dataIndex: 'totalClasses',
    sorter: (a, b) => a.totalClasses.length - b.totalClasses.length,
  },
  {
    title: 'Attended classes',
    dataIndex: 'classesAttended',
    sorter: (a, b) => a.classesAttended.length - b.classesAttended.length,
  },
  {
    title: 'Attendance (%)',
    dataIndex: 'attendancePercentage',
    sorter: (a, b) =>
      a.attendancePercentage.length - b.attendancePercentage.length,
    render: (text) => <>{text}%</>,
  },
];

const GroupReport = () => {
  const methods = useForm();
  const { handleSubmit, getValues } = methods;
  const { data: groupsList } = useGetGroupsListQuery();
  const { data: subjectsList } = useGetSubjectsListQuery();
  const [
    getGroupAttendanceReport,
    { isLoading: loadingGetGroupAttendanceReport },
  ] = useLazyGetGroupAttendanceReportQuery();

  const [
    downloadGroupAttendanceReport,
    { isLoading: loadingDownloadGroupAttendanceReport },
  ] = useLazyDownloadGroupAttendanceReportQuery();

  const { openNotification } = useNotification();

  const [dataSource, setDataSource] = useState([]);

  const getGroupReports = async (data) => {
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

  const handleDownloadGroupAttendanceReport = async () => {
    const data = getValues();
    await downloadGroupAttendanceReport({
      ...data,
      startDate: new Date(data?.startDate),
      endDate: new Date(data?.endDate),
    })
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(res);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `attendance_report.pdf`); // Specify the file name

        // Append to the document and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(getGroupReports)}>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 mt-2 ">
            <RHFAutocomplete
              label="Group"
              name="group"
              sx={{ width: '100%' }}
              size="small"
              options={groupsList}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 mt-2 ">
            <RHFAutocomplete
              label="Subject"
              name="subject"
              multiple
              sx={{ width: '100%' }}
              size="small"
              options={subjectsList}
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
                {dataSource && dataSource.length > 0 && (
                  <div className="row align-items-center">
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      <Button
                        htmlType="button"
                        type="primary"
                        loading={loadingDownloadGroupAttendanceReport}
                        onClick={handleDownloadGroupAttendanceReport}>
                        <i className="fas fa-download" /> Download
                      </Button>
                    </div>
                  </div>
                )}
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

export default GroupReport;
