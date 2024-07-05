import React from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useState } from "react";
import { TextField } from "@mui/material";
import Select from "react-select";

const AddExam = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [selectedClass, setSelectedClass] = useState(null);

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
                  <h3 className="page-title">Add Exam</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/exam">Exam</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Exam</li>
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
                            <span>Exam Information</span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Exam Name</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Class</label>
                            {/* <select className="form-control select">
                              <option>Select Class</option>
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
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Fees</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Start Time</label>
                            {/* <input type="time" className="form-control" /> */}
                            {/* <TimePicker className="form-control" onChange={setStartTime} value={startTime} /> */}
                            <TextField
                              className="form-control"
                              id="outlined-controlled"
                              type="time"
                              value={startTime}
                              onChange={(event) => {
                                setStartTime(event.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>End Time</label>
                            {/* <input type="time" className="form-control" /> */}
                            {/* <TimePicker className="form-control" onChange={setEndTime} value={endTime} /> */}
                            <TextField
                              className="form-control"
                              id="outlined-controlled"
                              type="time"
                              value={endTime}
                              onChange={(event) => {
                                setEndTime(event.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Event Date</label>
                            {/* <input type="date" className="form-control" /> */}
                            <DatePicker
                              className="form-control datetimepicker"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
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

export default AddExam;
