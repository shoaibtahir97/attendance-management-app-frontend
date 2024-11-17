import { Box, Stack } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFAutocomplete } from '../../components/HookForm';
import PageHeader from '../../components/PageHeader';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';
import {
  useLazyDownloadWarningLettersReportQuery,
  useLazyGetWarningLettersReportQuery,
} from '../../redux/slices/apiSlices/reportApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import { SKELETON } from '../Attendance/MarkAttendanceScreen';

const column = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    render: (text, record) => <p>{record.student.studentId}</p>,
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
    render: (text, record) => <p>{record.student.firstName}</p>,
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
    render: (text, record) => <p>{record.student.lastName}</p>,
  },
  {
    title: 'Group',
    dataIndex: 'group',
    render: (text, record) => <p>{record.student.group.name}</p>,
  },
  {
    title: 'Course',
    dataIndex: 'courseName',
    render: (text, record) => <p>{record.student.courseName.name}</p>,
  },
  {
    title: 'Warning Letters Issued',
    data: 'warningLetters',
    render: (text, record) => <p>{record.warningLetters.join(', ')}</p>,
  },
];

const WarningLetterReports = () => {
  const { openNotification } = useNotification();

  const methods = useForm({
    defaultValues: {
      types: [],
    },
  });
  const { handleSubmit, getValues } = methods;

  const [getWarningLetterReport, { isLoading, error }] =
    useLazyGetWarningLettersReportQuery();

  const [downloadWarningLetterReport, { isLoading: downloadingReport }] =
    useLazyDownloadWarningLettersReportQuery();

  const [dataSource, setDataSource] = useState({
    warningLetters: [],
    totalRecords: 0,
  });

  const [warningLetterQuery, setWarningLetterQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const fetchWarningLetters = async (query) => {
    await getWarningLetterReport(query)
      .unwrap()
      .then((res) => {
        console.log(res);
        const { warningLetters, filteredRecordsCount } = res.data;
        setDataSource({
          warningLetters,
          totalRecords: filteredRecordsCount,
        });
      })
      .catch((err) => {
        openNotification('error', err.message);
      });
  };

  const fetchWarningLettersByQuery = (data) => {
    const { types } = data;
    const types_ = {};

    types.forEach((type, index) => {
      types_[`type[${index}]`] = type;
    });
    fetchWarningLetters({ ...types_ });
  };

  const handleDownloadWarningLetterReport = async () => {
    const data = getValues();
    const { types } = data;
    const types_ = {};

    types.forEach((type, index) => {
      types_[`type[${index}]`] = type;
    });

    await downloadWarningLetterReport({
      ...types_,
    })
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(res);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `warning_letter_report.pdf`); // Specify the file name

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

  useEffect(() => {
    fetchWarningLetters(warningLetterQuery);
  }, []);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Warning letters report"
        pageTitle="Warning Letters Report"
        parentRoute={PATH_DASHBOARD.warningLetterReport}
        parentSection="Reports"
      />

      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchWarningLettersByQuery)}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            mb: 2,
          }}>
          <Box sx={{ width: '50%' }}>
            <RHFAutocomplete
              name="types"
              label="Type of warning letter"
              multiple
              options={['1st', '2nd', '3rd'].map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </Box>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </Stack>
      </FormProvider>

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center ">
                  <div className="col">
                    <h3 className="page-title">Warning Letters Report</h3>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <Button
                      loading={downloadingReport}
                      onClick={handleDownloadWarningLetterReport}
                      type="primary">
                      Generate Report
                    </Button>
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
                        setWarningLetterQuery({
                          ...warningLetterQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchWarningLetters({
                          page,
                          recordsPerPage: pageSize,
                          ...getValues(),
                        });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.warningLetters}
                    // rowSelection={rowSelection}
                    rowKey={(record) => record.student._id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningLetterReports;
