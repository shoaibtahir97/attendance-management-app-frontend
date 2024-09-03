import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';
import SideBar from '../../SideBar/SideBar';

const AddDepartment = () => {
  const [date, setDate] = useState(new Date());
  const handleChange = (date) => {
    setDate(date);
  };
  return (
    <div className="content container-fluid">
      {/* Page Header */}
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            <h3 className="page-title">Add Course</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/department">Course</Link>
              </li>
              <li className="breadcrumb-item active">Add Course</li>
            </ul>
          </div>
        </div>
      </div>
      {/* /Page Header */}
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-12">
                    <h5 className="form-title">
                      <span>Course Details</span>
                    </h5>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Course ID <span className="login-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Course Name <span className="login-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Module Lead <span className="login-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms calendar-icon">
                      <label>
                        Cohort Date <span className="login-danger">*</span>
                      </label>

                      <DatePicker
                        selected={date}
                        onChange={handleChange}
                        className="form-control datetimepicker"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    {/* <div className="form-group local-forms">
                      <label>
                        No of Students <span className="login-danger">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div> */}
                  </div>
                  <div className="col-12">
                    <div className="student-submit">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
