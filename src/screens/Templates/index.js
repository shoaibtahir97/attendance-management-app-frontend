import { Tooltip } from '@mui/material';
import { Alert } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useLazyGetTemplatesQuery } from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import { SKELETON } from '../Attendance/MarkAttendanceScreen';

const Templates = () => {
  const [getTemplates, { data, isLoading, error }] = useLazyGetTemplatesQuery();

  const fetchTemplates = async () => {
    await getTemplates()
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {});
  };

  useEffect(function () {
    // fetchTemplates();
  }, []);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Templates"
        pageTitle="Templates"
        parentRoute={PATH_DASHBOARD.templates}
        parentSection="Template"
      />
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table comman-shadow">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Templates</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Tooltip title="Create New Template" placement="top">
                      <Link
                        to={PATH_DASHBOARD.templates + '/add'}
                        className="btn btn-primary">
                        <i className="fas fa-plus" />
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {isLoading ? (
                SKELETON.map(
                  (_, index) => <>Loading...</>
                  // <TableSkeleton key={index} columns={column} />
                )
              ) : error ? (
                <Alert
                  message="Error"
                  description={error?.data?.message || error.error}
                  type="error"
                  showIcon
                />
              ) : (
                <div className="table-responsive">
                  {/* <Table
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
                  /> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
