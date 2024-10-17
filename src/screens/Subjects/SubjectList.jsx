import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Table, Tooltip } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../../components/Pagination';
import { useState } from 'react';
import { useLazyGetStudentsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import PageHeader from '../../components/PageHeader';
import { apiSlice } from '../../redux/slices/apiSlices/apiSlice';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/HookForm';
import { Box, Grid, Stack } from '@mui/material';
import TableSkeleton from '../../components/TableSkeleton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLazyGetSubjectsQuery } from '../../redux/slices/apiSlices/subjectApiSlice';

export const column = [
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: (a, b) => a.code.length - b.code.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: (text, record) => <h2 className="table-avatar">{text}</h2>,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    render: (text, record) => (
      <>
        <div className="actions">
          <Tooltip title="Edit Subject">
            <Link
              to={`${PATH_DASHBOARD.subjectEdit}/${record._id}`}
              className="btn btn-sm bg-danger-light">
              <i className="feather-edit">
                <FeatherIcon icon="edit" className="list-edit" />
              </i>
            </Link>
          </Tooltip>
        </div>
      </>
    ),
  },
];

const SKELETON = ['', '', '', '', ''];

const SubjectsList = () => {
  const [subjectsQuery, setSubjectsQuery] = useState({
    page: 1,
    recordsPerPage: 10,
  });
  const [getSubjects, { data, isLoading, error }] = useLazyGetSubjectsQuery();

  const [dataSource, setDataSource] = useState({
    subjects: [],
    totalRecords: 0,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const subjectQuerySchema = Yup.object().shape({
    code: Yup.string().trim(),
    name: Yup.string().trim(),
  });

  const methods = useForm({
    resolver: yupResolver(subjectQuerySchema),
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const fetchSubjects = async (query) => {
    await getSubjects(query)
      .unwrap()
      .then((res) => {
        const { subjects, totalSubjects, filteredSubjects } = res;
        setDataSource({
          subjects: subjects,
          totalRecords: filteredSubjects,
        });
      });
  };

  const fetchSubjectsByQuery = (data) => {
    fetchSubjects({ ...data, ...subjectsQuery });
  };

  useEffect(() => {
    fetchSubjects(subjectsQuery);
  }, []);

  return (
    <>
      <div className="content container-fluid">
        {/* Page Header  */}
        <PageHeader
          currentSection="All Subjects"
          pageTitle="Subjects"
          parentRoute={PATH_DASHBOARD.subjects}
          parentSection="Subject"
        />
        {/* Filters */}
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(fetchSubjectsByQuery)}>
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2 }}>
            <Box sx={{ width: '100%' }}>
              <RHFTextField name="code" label="Code" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <RHFTextField name="name" label="Name" />
            </Box>
            <Box sx={{ width: '100%', mt: 1 }}>
              <Button
                loading={isSubmitting}
                type="primary"
                htmlType="submit"
                size="large">
                Search
              </Button>
            </Box>
          </Stack>
        </FormProvider>
        {/* Subjects list */}

        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table comman-shadow">
              <div className="card-body">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Subjects</h3>
                    </div>
                    <div className="col-auto text-end float-end ms-auto download-grp">
                      {/* {dataSource?.students?.length ? (
                        <Link to="#" className="btn btn-outline-primary me-2">
                          <i className="fas fa-download" /> Download
                        </Link>
                      ) : (
                        <></>
                      )} */}
                      <Tooltip title="Add Subject">
                        <Link
                          to={PATH_DASHBOARD.subjectAdd}
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
                          setSubjectsQuery({
                            ...subjectsQuery,
                            page,
                            recordsPerPage: pageSize,
                          });
                          fetchSubjects({
                            page,
                            recordsPerPage: pageSize,
                            ...getValues(),
                          });
                        },
                      }}
                      columns={column}
                      dataSource={dataSource.subjects}
                      rowSelection={rowSelection}
                      rowKey={(record) => record._id}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectsList;
