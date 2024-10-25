import React, { useEffect, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Alert, Button, Card, Table, Tag } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './notices.css';
import NoticeDialog from './NoticeDialog';
import {
  useGetNoticesQuery,
  useLazyGetNoticesQuery,
} from '../../redux/slices/apiSlices/noticesApiSlice';
import {
  Box,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../components/HookForm';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import useNotification from '../../hooks/useNotification';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TableSkeleton from '../../components/TableSkeleton';

const SKELETON = ['', '', '', '', '', ''];

const Notices = () => {
  const { openNotification } = useNotification();
  const [dataSource, setDataSource] = useState({
    notices: [],
    totalRecords: 0,
  });
  const [getNotices, { isLoading, error }] = useLazyGetNoticesQuery();
  const [currentNotice, setCurrentNotice] = useState(null);

  const column = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      render: (text, record) => <h2 className="table-avatar">{text}</h2>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
    },

    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.length - b.date.length,
      render: (text, record) => <p>{format(new Date(text), 'dd-MM-yyyy')}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      sorter: (a, b) => a.isActive.length - b.isActive.length,
      render: (text, record) => {
        return (
          <Box>
            {text === true ? (
              <Tag color="success">Active</Tag>
            ) : (
              <Tag color="error">Inactive</Tag>
            )}
          </Box>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      render: (text, record) => {
        const onEditNotice = () => {
          setCurrentNotice(record);
          showModalMethod(!isAddNoticeDialogOpen);
        };
        return (
          <>
            <div className="actions">
              <Tooltip title="Edit Notice" placement="top">
                <IconButton onClick={onEditNotice}>
                  <FiEdit size="14px" />
                </IconButton>
              </Tooltip>
            </div>
          </>
        );
      },
    },
  ];

  const [isAddNoticeDialogOpen, setIsAddNoticeDialogOpen] = useState(false);
  const showModalMethod = () =>
    setIsAddNoticeDialogOpen(!isAddNoticeDialogOpen);

  const [noticesQuery, setNoticesQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const methods = useForm();
  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const fetchNotices = async (query = noticesQuery) => {
    await getNotices(query)
      .unwrap()
      .then((res) => {
        setDataSource({
          notices: res.data,
          totalRecords: res.filteredGroups,
        });
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  const fetchNoticesByQuery = (data) => {
    fetchNotices({ ...data, ...noticesQuery });
  };

  useEffect(() => {
    fetchNotices(noticesQuery);
  }, []);

  return (
    <div className="content container-fluid">
      <NoticeDialog
        isShowModal={isAddNoticeDialogOpen}
        showModalMethod={showModalMethod}
        currentNotice={currentNotice}
        setCurrentNotice={setCurrentNotice}
        fetchNotices={fetchNotices}
      />

      {currentNotice && (
        <NoticeDialog
          isShowModal={isAddNoticeDialogOpen}
          showModalMethod={showModalMethod}
          currentNotice={currentNotice}
          setCurrentNotice={setCurrentNotice}
          fetchNotices={fetchNotices}
        />
      )}

      <PageHeader
        currentSection="Notices"
        pageTitle="Notices"
        parentRoute={PATH_DASHBOARD.notices}
        parentSection="Notice"
      />

      {/* <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchNoticesByQuery)}>
        <Stack
          direction="row"
          alignItems="end"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="title" label="Title" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFTextField name="date" label="Date" />
          </Box>
          <Box sx={{ width: '100%' }}>
            <RHFSelect
              name="isActive"
              label="Status"
              options={[
                { value: true, label: 'Active' },
                { value: false, label: 'Inactive' },
              ]}
            />
          </Box>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large">
              Search
            </Button>
          </Box>
        </Stack>
      </FormProvider> */}

      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Notices</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Tooltip title="Add Notice" placement="top">
                      <Link
                        onClick={showModalMethod}
                        className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </Tooltip>
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
                        setNoticesQuery({
                          ...noticesQuery,
                          page,
                          recordsPerPage: pageSize,
                        });
                        fetchNotices({
                          page,
                          recordsPerPage: pageSize,
                          ...getValues(),
                        });
                      },
                    }}
                    columns={column}
                    dataSource={dataSource.notices}
                    // rowSelection={rowSelection}
                    rowKey={(record) => record._id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <Card>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <Alert
            message="Error"
            type="error"
            style={{ width: '60%' }}
            description={error.data?.message}
          />
        ) : (
          <FullCalendar
            ref={calendarRef}
            editable
            selectable
            events={notices}
            select={handleSelect}
            eventClick={handleNoticeClick}
            eventContent={renderNoticeComponent}
            headerToolbar={{
              left: 'today prev next title',
              center: '',
              right: '',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
            viewHeight={'100vh'}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // Set to false for 24-hour format
            }}
            slotMinTime="09:30:00"
            slotMaxTime="22:00:00"
            slotDuration="01:00:00"
            weekends={true}
            dayHeaderFormat={{
              weekday: 'short',
              day: 'numeric',
              omitCommas: true,
            }}
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
          />
        )}
      </Card> */}
    </div>
  );
};

export default Notices;
