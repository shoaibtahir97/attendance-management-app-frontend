import React, { useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Select from "react-select";

const AddFeesCollection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionTwo, setSelectedOptionTwo] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const options = [
    { id: 1, value: "Select Gender", label: "Select Gender" },
    { id: 2, value: "Female", label: "Female" },
    { id: 3, value: "Male", label: "Male" },
    { id: 4, value: "Others", label: "Others" },
  ];

  const group = [
    { id: 1, text: "Select Type" },
    { id: 2, text: "Class Test" },
    { id: 3, text: "Exam Fees" },
    { id: 4, text: "Hostel Fees" },
    { id: 5, text: "Transport Fees" },
    { id: 6, text: "Mess Fees" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleChangeTwo = (selectedOptionTwo) => {
    setSelectedOptionTwo(selectedOptionTwo);
  };

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Add Fees</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/feescollection">Accounts</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Fees</li>
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
                            <span>Fees Information</span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Student ID <span className="login-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Student Name{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Gender <span className="login-danger">*</span>
                            </label>

                            <Select
                              className="w-100 local-forms  select"
                              value={selectedOption}
                              onChange={handleChange}
                              options={options}
                              placeholder="Select Gender"
                              isSearchable={false}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Fees Type <span className="login-danger">*</span>
                            </label>

                            <Select
                              className="w-100 select"
                              value={selectedOptionTwo}
                              onChange={handleChangeTwo}
                              options={group}
                              placeholder="Select Type"
                              isSearchable={false}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Fees Amount{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms calendar-icon">
                            <label>
                              Paid Date <span className="login-danger">*</span>
                            </label>
                            {/* <input
                              className="form-control datetimepicker"
                              type="text"
                              placeholder="DD-MM-YYYY"
                            /> */}
                            <DatePicker
                              className="form-control datetimepicker w-100"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
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
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default AddFeesCollection;
