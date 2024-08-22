import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { onShowSizeChange, itemRender } from '../../Pagination';
import { useState } from 'react';
import { useGetStudentsQuery } from '../../../redux/slices/studentApiSlice';
import { PATH_DASHBOARD } from '../../../routes/paths';
import PageHeader from '../../PageHeader';

export const column = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    sorter: (a, b) => a.studentId.length - b.studentId.length,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render: (text, record) => (
      <>
        <h2 className="table-avatar">
          {text}
          {/* <Link to="/studentsview" className="avatar avatar-sm me-2 ">
            <img
              className="avatar-img rounded-circle"
              src={record.Img}
              alt="User Image"
            />
          </Link>
          <Link className="text-dark" to="/studentsview">
            {record.Name}
          </Link> */}
        </h2>
      </>
    ),
  },
  {
    title: 'Group',
    dataIndex: 'group',
    sorter: (a, b) => a.group.length - b.group.length,
  },
  {
    title: 'Phone number',
    dataIndex: 'phoneNumber',
    sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    sorter: (a, b) => a.emailAddress.length - b.emailAddress.length,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.length - b.gender.length,
  },
  {
    title: 'DOB',
    dataIndex: 'dateOfBirth',
    sorter: (a, b) => a.dateOfBirth.length - b.dateOfBirth.length,
  },
  {
    title: 'Parent Name',
    dataIndex: 'parentName',
    sorter: (a, b) => a.parentName.length - b.parentName.length,
  },
  {
    title: 'Emergency Number',
    dataIndex: 'emergencyNumber',
    sorter: (a, b) => a.emergencyNumber.length - b.emergencyNumber.length,
  },
  {
    title: 'Warning Letters Issued',
    dataIndex: 'numOfWarningLettersIssued',
    sorter: (a, b) =>
      a.numOfWarningLettersIssued.length - b.numOfWarningLettersIssued.length,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    render: (text, record) => (
      <>
        <div className="actions">
          {/* <Link
            to={`${PATH_DASHBOARD.studentEdit}/${record.id}`}
            className="btn btn-sm bg-success-light me-2">
            <i className="feather-eye">
              <FeatherIcon icon="eye" />
            </i>
          </Link> */}
          <Link
            to={`${PATH_DASHBOARD.studentEdit}/${record.id}`}
            className="btn btn-sm bg-danger-light">
            <i className="feather-edit">
              <FeatherIcon icon="edit" className="list-edit" />
            </i>
          </Link>
        </div>
      </>
    ),
  },
];

const Students = () => {
  const { data, isLoading, error } = useGetStudentsQuery();
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    if (data && data.length) {
      const students = data.map((student) => ({
        id: student._id,
        studentId: student.studentId,
        name: `${student.firstName} ${student.lastName}`,
        group: student.group,
        phoneNumber: student.phoneNumber,
        emailAddress: student.emailAddress,
        address: student.address,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        parentName: student.parentName,
        emergencyNumber: student.emergencyNumber,
        numOfWarningLettersIssued: student.numOfWarningLettersIssued.length,
      }));
      setDataSource(students);
    }
  }, [data]);

  return (
    <>
      <div className="content container-fluid">
        {/* Page Header  */}
        <PageHeader
          currentSection="All Students"
          pageTitle="Students"
          parentRoute={PATH_DASHBOARD.students}
          parentSection="Student"
        />

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
                  placeholder="Search by Phone ..."
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
        {isLoading ? (
          <h2>Loading</h2>
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-table comman-shadow">
                <div className="card-body">
                  {/* Page Header */}
                  <div className="page-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h3 className="page-title">Students</h3>
                      </div>
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link
                          to="/students"
                          className="btn btn-outline-gray me-2 active">
                          <FeatherIcon className="feather-list" icon="list" />
                        </Link>
                        <Link
                          to="/studentgrid"
                          className="btn btn-outline-gray me-2">
                          <FeatherIcon className="feather-grid" icon="grid" />
                        </Link>
                        <Link to="#" className="btn btn-outline-primary me-2">
                          <i className="fas fa-download" /> Download
                        </Link>
                        <Link to="/addstudent" className="btn btn-primary">
                          <i className="fas fa-plus" />
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
                      rowSelection={rowSelection}
                      rowKey={(record) => record.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Students;
