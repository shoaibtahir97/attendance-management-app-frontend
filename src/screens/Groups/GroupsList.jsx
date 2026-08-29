import { Alert, IconButton, Tooltip } from '@mui/material';
import { Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './groups.css';

import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import useNotification from '../../hooks/useNotification';

import { useLazyGetGroupsQuery } from '../../redux/slices/apiSlices/groupApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';

import { MergeGroupsDialog } from './MergeGroupsDialog';
import GroupFilter from './components/GroupFilter';

const SKELETON = ['', '', '', '', ''];

const getGroupRowKey = (record) => record?.['_id'] || record?.id;

const GroupsList = () => {
  const [getGroups, { isLoading, error }] = useLazyGetGroupsQuery();

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

  const [isGroupFilterOpen, setIsGroupFilterOpen] = useState(false);
  const [isMergeGroupsDialogOpen, setIsMergeGroupsDialogOpen] = useState(false);

  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a?.name?.localeCompare(b?.name),
      render: (text) => <span className="groups-name">{text}</span>,
    },

    {
      title: 'Course',
      dataIndex: 'course',
      sorter: (a, b) => a?.course?.localeCompare(b?.course),
      render: (text) => <span className="groups-course">{text}</span>,
    },

    {
      title: 'Students',
      dataIndex: 'students',
      sorter: (a, b) => Number(a?.students || 0) - Number(b?.students || 0),
      render: (text) => <span className="groups-students">{text}</span>,
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      width: 90,
      render: (text, record) => {
        const onEditGroup = () => {
          navigate(`${PATH_DASHBOARD.groupEdit}/${record?._id}`);
        };

        return (
          <div className="groups-action">
            <Tooltip title="Edit Group" placement="top">
              <IconButton onClick={onEditGroup} className="data-action-button">
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
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const fetchGroupsByQuery = (data) => {
    const query = {
      page: 1,
      recordsPerPage: groupsQuery.recordsPerPage,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== '' && value != null
        )
      ),
    };

    setGroupsQuery(query);
    fetchGroups(query);
    setIsGroupFilterOpen(false);
  };

  const handleRemoveFilter = (key) => {
    const query = { ...groupsQuery, page: 1 };
    delete query[key];
    setGroupsQuery(query);
    fetchGroups(query);
  };

  const clearFilters = () => {
    const query = { page: 1, recordsPerPage: 10 };
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
      .filter((group) => limitedKeys.includes(getGroupRowKey(group)))
      .map((group) => group.name);

    setSelectedRowNames(selectedNames);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,

    getCheckboxProps: (record) => ({
      disabled:
        selectedRowKeys.length >= 2 &&
        !selectedRowKeys.includes(getGroupRowKey(record)),
    }),
  };

  // =========================================================
  // MERGE GROUPS
  // =========================================================

  const toggleMergeGroupsDialog = () => {
    setIsMergeGroupsDialogOpen(!isMergeGroupsDialogOpen);
  };

  const handleReset = () => {
    setSelectedRowKeys([]);
    setSelectedRowNames([]);

    toggleMergeGroupsDialog();

    fetchGroups(groupsQuery);
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
    <div className="content container-fluid data-page groups-page">
      {/* Merge Groups Dialog */}
      <MergeGroupsDialog
        isShowModal={isMergeGroupsDialogOpen}
        showModalMethod={toggleMergeGroupsDialog}
        selectedGroupIds={selectedRowKeys}
        selectedGroupNames={selectedRowNames}
        handleReset={handleReset}
      />

      {/* =====================================================
          GROUPS CARD
      ===================================================== */}

      <div className="data-table-card">
        {/* Card Header */}
        <div className="data-table-header">
          <h3 className="data-table-title">Groups</h3>

          <div className="data-header-actions">
            {/* Merge Groups */}
            {selectedRowKeys.length === 2 && (
              <Button
                type="primary"
                size="large"
                onClick={toggleMergeGroupsDialog}>
                Merge Groups
              </Button>
            )}

            {/* Add Group */}
            <Button
              type="primary"
              onClick={() => navigate(PATH_DASHBOARD.groupAdd)}>
              + Add Group
            </Button>
          </div>
        </div>

        <GroupFilter
          open={isGroupFilterOpen}
          query={groupsQuery}
          onOpen={() => setIsGroupFilterOpen(true)}
          onClose={() => setIsGroupFilterOpen(false)}
          onSubmit={fetchGroupsByQuery}
          onRemoveFilter={handleRemoveFilter}
          clearFilters={clearFilters}
        />

        {/* =====================================================
            TABLE
        ===================================================== */}

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
                total: dataSource?.totalRecords,

                showTotal: (total, range) =>
                  `Showing ${range[0]} to ${range[1]} of ${total} entries`,

                showSizeChanger: true,

                onShowSizeChange: onShowSizeChange,

                itemRender: itemRender,

                onChange: (page, pageSize) => {
                  setSelectedRowKeys([]);
                  setSelectedRowNames([]);

                  const query = {
                    ...groupsQuery,
                    page,
                    recordsPerPage: pageSize,
                  };

                  setGroupsQuery(query);
                  fetchGroups(query);
                },
              }}
              columns={column}
              dataSource={dataSource?.groups}
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
