import React from 'react';
import { Link } from 'react-router-dom';

const StudentReports = () => {
  return (
    <div className='content container-fluid'>
      <div className='page-header'>
        <div className='page-header'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='page-sub-header'>
                <h3 className='page-title'>Student Reports</h3>
                {/* <ul class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/dashboard">Attendance</Link>
                  </li>
                  <li class="breadcrumb-item active">Attendance</li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <h6>Filters</h6>
        </div>
        <div className='col'></div>
      </div>
    </div>
  );
};

export default StudentReports;
