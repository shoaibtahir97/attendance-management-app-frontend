import { IconButton, Tooltip } from '@mui/material';
import { Alert, Button, Table } from 'antd';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { itemRender, onShowSizeChange } from '../../components/Pagination';
import TableSkeleton from '../../components/TableSkeleton';
import { useLazyGetSubjectsQuery } from '../../redux/slices/apiSlices/subjectApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import SubjectFilter from './components/SubjectFilter';
import './subjects.css';

const SKELETON = ['', '', '', '', ''];

const SubjectsList = () => {
  const navigate = useNavigate();
  const [getSubjects, { isLoading, error }] = useLazyGetSubjectsQuery();

  const [subjectsQuery, setSubjectsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });

  const [dataSource, setDataSource] = useState({
    subjects: [],
    totalRecords: 0,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isSubjectFilterOpen, setIsSubjectFilterOpen] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const column = [
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      render: (text) => <span className="subject-code">{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <span className="subject-name">{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: 90,
      render: (text, record) => (
        <div className="subject-action">
          <Tooltip title="Edit Subject" placement="top">
            <Link
              to={`${PATH_DASHBOARD.subjectEdit}/${record._id}`}
              className="data-action-button">
              <IconButton component="span">
                <FiEdit size={16} />
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchSubjects = async (query) => {
    await getSubjects(query)
      .unwrap()
      .then((res) => {
        const { subjects, filteredSubjects } = res;
        setDataSource({
          subjects,
          totalRecords: filteredSubjects,
        });
      });
  };

  const fetchSubjectsByQuery = (data) => {
    const query = {
      page: 1,
      recordsPerPage: subjectsQuery.recordsPerPage,
      ...Object.fromEntries(
        Object.entries(data).filter(
          ([, value]) => value !== '' && value != null
        )
      ),
    };

    setSubjectsQuery(query);
    fetchSubjects(query);
    setIsSubjectFilterOpen(false);
  };

  const handleRemoveFilter = (key) => {
    const query = { ...subjectsQuery, page: 1 };
    delete query[key];
    setSubjectsQuery(query);
    fetchSubjects(query);
  };

  const clearFilters = () => {
    const query = { page: 1, recordsPerPage: 10 };
    setSubjectsQuery(query);
    fetchSubjects(query);
  };

  useEffect(() => {
    fetchSubjects(subjectsQuery);
  }, []);

  return (
    <div className="content container-fluid data-page subjects-page">
      <div className="data-table-card">
        <div className="data-table-header">
          <h3 className="data-table-title">Subjects</h3>

          <div className="data-header-actions">
            <Button
              type="primary"
              onClick={() => navigate(PATH_DASHBOARD.subjectAdd)}>
              + Add Subject
            </Button>
          </div>
        </div>

        <SubjectFilter
          open={isSubjectFilterOpen}
          query={subjectsQuery}
          onOpen={() => setIsSubjectFilterOpen(true)}
          onClose={() => setIsSubjectFilterOpen(false)}
          onSubmit={fetchSubjectsByQuery}
          onRemoveFilter={handleRemoveFilter}
          clearFilters={clearFilters}
        />

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
                  const query = {
                    ...subjectsQuery,
                    page,
                    recordsPerPage: pageSize,
                  };

                  setSubjectsQuery(query);
                  fetchSubjects(query);
                },
              }}
              columns={column}
              dataSource={dataSource.subjects}
              rowSelection={rowSelection}
              rowKey={(record) => record._id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
