import { Alert, Box, IconButton, Stack, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './groups.css';

import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from '../../components/HookForm';

import PageHeader from '../../components/PageHeader';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';

import { useGetCoursesListQuery } from '../../redux/slices/apiSlices/courseApiSlice';
import { useLazyGetGroupsQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

import { MergeGroupsDialog } from './MergeGroupsDialog';

const SKELETON = ['', '', '', '', ''];

const getGroupRowKey = (record) =>
  record?.['_id'] || record?.id;

const GroupsList = () => {
  const methods = useForm();

  const [getGroups, { data, isLoading, error }] =
    useLazyGetGroupsQuery();

  const {
    data: coursesList,
    isLoading: loadingCourses,
  } = useGetCoursesListQuery();

  const { openNotification } = useNotification();
  const navigate = useNavigate();

  const [groupsQuery, setGroupsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const [dataSource, setDataSource] = useState({
    groups: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowNames, setSelectedRowNames] = useState([]);

  const [isMergeGroupsDialogOpen, setIsMergeGroupsDialogOpen] =
    useState(false);

  const { handleSubmit, getValues, reset } = methods;

  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) =>
        a?.name?.localeCompare(b?.name),
      render: (text) => (
        <span className="groups-name">
          {text}
        </span>
      ),
    },

    {
      title: 'Course',
      dataIndex: 'course',
      sorter: (a, b) =>
        a?.course?.localeCompare(b?.course),
      render: (text) => (
        <span className="groups-course">
          {text}
        </span>
      ),
    },

    {
      title: 'Students',
      dataIndex: 'students',
      sorter: (a, b) =>
        Number(a?.students || 0) -
        Number(b?.students || 0),
      render: (text) => (
        <span className="groups-students">
          {text}
        </span>
      ),
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      width: 90,
      render: (text, record) => {
        const onEditGroup = () => {
          navigate(
            `${PATH_DASHBOARD.groupEdit}/${record?._id}`
          );
        };

        return (
          <div className="groups-action">
            <Tooltip
              title="Edit Group"
              placement="top"
            >
              <IconButton
                onClick={onEditGroup}
                className="groups-edit-button"
              >
                <FiEdit size={17} />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  // =========================================================
  // FETCH GROUPS
  // =========================================================

  const fetchGroups = async (query) => {
    await getGroups(query)
      .unwrap()
      .then((res) => {
        setDataSource({
          groups: res?.groups || [],
          totalRecords: res?.filteredGroups || 0,
        });
      })
      .catch((err) => {
        openNotification(
          'error',
          err?.data?.message || err?.error
        );
      });
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const fetchGroupsByQuery = (data) => {
    const query = {
      ...groupsQuery,
      page: 1,
      ...data,
    };

    setGroupsQuery(query);
    fetchGroups(query);
  };

  // =========================================================
  // SELECTION
  // =========================================================

  const onSelectChange = (newSelectedRowKeys) => {
    const limitedKeys = newSelectedRowKeys.slice(-2);

    setSelectedRowKeys(limitedKeys);

    const selectedNames = dataSource.groups
      .filter((group) =>
        limitedKeys.includes(getGroupRowKey(group))
      )
      .map((group) => group.name);

    setSelectedRowNames(selectedNames);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,

    getCheckboxProps: (record) => ({
      disabled:
        selectedRowKeys.length >= 2 &&
        !selectedRowKeys.includes(
          getGroupRowKey(record)
        ),
    }),
  };

  // =========================================================
  // MERGE GROUPS
  // =========================================================

  const toggleMergeGroupsDialog = () => {
    setIsMergeGroupsDialogOpen(
      !isMergeGroupsDialogOpen
    );
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
    setSelectedRowNames([]);

    toggleMergeGroupsDialog();

    fetchGroups({
      ...groupsQuery,
      ...getValues(),
    });
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchGroups(groupsQuery);
  }, []);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="content container-fluid groups-page">

      {/* Merge Groups Dialog */}
      <MergeGroupsDialog
        isShowModal={isMergeGroupsDialogOpen}
        showModalMethod={toggleMergeGroupsDialog}
        selectedGroupIds={selectedRowKeys}
        selectedGroupNames={selectedRowNames}
        handleReset={handleReset}
      />
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <PageHeader
        currentSection="All Groups"
        pageTitle="Groups"
        parentRoute={PATH_DASHBOARD.groups}
        parentSection="Group"
      />

      {/* =====================================================
          FILTER AREA
      ===================================================== */}

      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(fetchGroupsByQuery)}
      >
        <div className="groups-filter-area">

          {/* Group Name */}
          <div className="groups-filter-field groups-name-filter">
            <RHFTextField
              name="name"
              label="Group Name"
              placeholder="Enter group name..."
            />
          </div>

          {/* Course */}
          <div className="groups-filter-field groups-course-filter">
            <RHFAutocomplete
              name="course"
              label="Course"
              options={coursesList || []}
              loading={loadingCourses}
            />
          </div>

          {/* Search */}
          <div className="groups-search-button-wrapper">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              size="large"
              className="groups-search-button"
            >
              Search
            </Button>
          </div>

        </div>
      </FormProvider>

      {/* =====================================================
          GROUPS CARD
      ===================================================== */}

      <div className="groups-card">

        {/* Card Header */}
        <div className="groups-card-header">

          <h3 className="groups-card-title">
            Groups
          </h3>

          <div className="groups-card-actions">

            {/* Merge Groups */}
            {selectedRowKeys.length === 2 && (
              <Button
                type="primary"
                size="large"
                onClick={toggleMergeGroupsDialog}
              >
                Merge Groups
              </Button>
            )}

            {/* Add Group */}
            <Link
              to={PATH_DASHBOARD.groupAdd}
              className="groups-add-button"
            >
              <span className="groups-add-icon">
                +
              </span>

              <span>
                Add Group
              </span>
            </Link>

          </div>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="groups-table-wrapper">

          {isLoading ? (
            SKELETON.map((_, index) => (
              <TableSkeleton
                key={index}
                columns={column}
              />
            ))
          ) : error ? (
            <Alert
              message="Error"
              description={
                error?.data?.message ||
                error?.error
              }
              type="error"
              showIcon
            />
          ) : (
            <Table
              className="groups-ant-table"
              pagination={{
                total:
                  dataSource?.totalRecords,

                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,

                showSizeChanger: true,

                onShowSizeChange:
                  onShowSizeChange,

                itemRender: itemRender,

                onChange: (
                  page,
                  pageSize
                ) => {
                  setSelectedRowKeys([]);
                  setSelectedRowNames([]);

                  const query = {
                    ...groupsQuery,
                    page,
                    recordsPerPage:
                      pageSize,
                    ...getValues(),
                  };

                  setGroupsQuery(query);
                  fetchGroups(query);
                },
              }}
              columns={column}
              dataSource={
                dataSource?.groups
              }
              rowSelection={rowSelection}
              rowKey={getGroupRowKey}
            />
          )}

        </div>

      </div>

    </div>
  );
};

export default GroupsList;