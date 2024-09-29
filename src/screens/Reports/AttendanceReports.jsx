import { Tabs } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import GroupReport from './GroupReport';
import StudentReport from './StudentReport';

const AttendanceReportsV2 = () => {
  const items = [
    {
      key: '1',
      label: 'Group ',
      children: <GroupReport />,
    },
    {
      key: '2',
      label: 'Student',
      children: <StudentReport />,
    },
  ];

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <div className="page-sub-header">
                <h3 className="page-title">Attendance Reports</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="card p-3">
            <Tabs
              defaultActiveKey="1"
              items={items}
              // onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportsV2;
