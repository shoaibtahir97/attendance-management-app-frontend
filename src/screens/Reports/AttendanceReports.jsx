import { Tabs } from 'antd';
import CourseReport from './CourseReport';
import GroupReportV2 from './GroupReportV2';

const AttendanceReportsV2 = () => {
  const items = [
    {
      key: '0',
      label: 'Course',
      children: <CourseReport />,
    },
    {
      key: '1',
      label: 'Group',
      children: <GroupReportV2 />,
    },
    // {
    //   key: '2',
    //   label: 'Student',
    //   children: <StudentReport />,
    // },
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
              defaultActiveKey="0"
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
