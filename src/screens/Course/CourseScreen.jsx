import React from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const CourseScreen = () => {
  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <PageHeader
        currentSection="All Courses"
        pageTitle="Courses"
        parentRoute={PATH_DASHBOARD.courses}
        parentSection="Courses"
      />
      {/* /Page Header */}
      <div className="student-group-form">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID ..."
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name ..."
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Year ..."
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="search-student-btn">
              <button type="btn" className="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Courses</h3>
                  </div>
                  <div className="col-auto text-end float-end ms-auto download-grp">
                    <Link to="#" className="btn btn-outline-primary me-2">
                      <i className="fas fa-download" /> Download
                    </Link>
                    <Link to="/adddepartment" className="btn btn-primary">
                      <i className="fas fa-plus" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Page Header */}
              <Table
                class="table table-stripped table-hover datatable"
                pagination={{
                  total: datasource.length,
                  showTotal: (total, range) =>
                    `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  itemRender: itemRender,
                }}
                columns={column}
                dataSource={datasource}
                rowSelection={rowSelection}
                rowKey={(record) => record.id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseScreen;
