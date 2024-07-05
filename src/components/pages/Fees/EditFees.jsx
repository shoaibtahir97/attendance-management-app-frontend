import React from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Select from "react-select";

const EditFees = () => {
  const [endDate, setEndDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const options = [
    { value: 1, label: "Select Type" },
    { value: 2, label: "Class Test" },
    { value: 3, label: "Exam Fees" },
    { value: 4, label: "Hostel Fees" },
    { value: 5, label: "Transport Fees" },
    { value: 6, label: "Mess Fees" },
  ];
  const classTypeOptions = [
    { value: 1, label: "Select class" },
    { value: 2, label: "LKG" },
    { value: 3, label: "UKG" },
    { value: 4, label: "1" },
    { value: 5, label: "2" },
    { value: 6, label: "3" },
    { value: 7, label: "4" },
    { value: 8, label: "5" },
    { value: 9, label: "6" },
    { value: 10, label: "7" },
    { value: 11, label: "8" },
    { value: 12, label: "9" },
    { value: 13, label: "10" },
    { value: 14, label: "11" },
    { value: 15, label: "12" },
  ];

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
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
                  <h3 className="page-title">Edit Fees</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/fees">Fees</Link>
                    </li>
                    <li className="breadcrumb-item active">Edit Fees</li>
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
                              Fees ID <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="PRE1234"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Fees Type <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                              <option>Exam Fees</option>
                              <option>Class Test</option>
                              <option>Exam Fees</option>
                              <option>Hostel Fees</option>
                              <option>Transport Fees</option>
                              <option>Mess Fees</option>
                            </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedType}
                              onChange={handleTypeChange}
                              options={options}
                              placeholder="Select Type"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Gender <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                              <option>9</option>
                              <option>LKG</option>
                              <option>UKG</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                              <option>11</option>
                              <option>12</option>
                            </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedClass}
                              onChange={handleClassChange}
                              options={classTypeOptions}
                              placeholder="Select Class"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Fees Amount{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="$152"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Start Date <span className="login-danger">*</span>
                            </label>
                            {/* <input
                              type="text"
                              className="form-control"
                              defaultValue="23 Apr 2020"
                            /> */}
                            <DatePicker
                              className="form-control datetimepicker"
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              End Date <span className="login-danger">*</span>
                            </label>
                            {/* <input
                              type="text"
                              className="form-control"
                              defaultValue="28 Apr 2020"
                            /> */}
                            <DatePicker
                              className="form-control datetimepicker"
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
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

export default EditFees;
