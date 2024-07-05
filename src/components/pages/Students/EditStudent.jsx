import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Select from "react-select";

const EditStudent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);

  const options1 = [
    { value: 1, label: "Select Gender" },
    { value: 2, label: "Female" },
    { value: 3, label: "Male" },
    { value: 4, label: "Others" },
  ];

  const options2 = [
    { value: 1, label: "Please Select Group" },
    { value: 2, label: "B+" },
    { value: 3, label: "A+" },
    { value: 4, label: "O+" },
  ];

  const options3 = [
    { value: 1, label: "Please Select Religion" },
    { value: 2, label: "Hindu" },
    { value: 3, label: "Christian" },
    { value: 4, label: "Others" },
  ];

  const options4 = [
    { value: 1, label: "Please Select Class" },
    { value: 2, label: "12" },
    { value: 3, label: "11" },
    { value: 4, label: "10" },
  ];

  const options5 = [
    { value: 1, label: "Please Select Section" },
    { value: 2, label: "A" },
    { value: 3, label: "B" },
    { value: 4, label: "C" },
  ];

  const handleOption1Change = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  const handleOption2Change = (selectedOption) => {
    setSelectedOption2(selectedOption);
  };

  const handleOption3Change = (selectedOption) => {
    setSelectedOption3(selectedOption);
  };

  const handleOption4Change = (selectedOption) => {
    setSelectedOption4(selectedOption);
  };

  const handleOption5Change = (selectedOption) => {
    setSelectedOption5(selectedOption);
  };
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* Sidebar */}
        <SideBar />
        {/* Page Wrapper */}`{" "}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">Edit Students</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">Student</Link>
                      </li>
                      <li className="breadcrumb-item active">Edit Students</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card comman-shadow">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <h5 className="form-title student-info">
                            Student Information{" "}
                            <span>
                              <Link to="#">
                                <i className="feather-more-vertical">
                                  <FeatherIcon icon="more-vertical" />
                                </i>
                              </Link>
                            </span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              First Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="John Doe"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Last Name <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="Stephen"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Gender <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Select Gender</option>
                                                            <option>Female</option>
                                                            <option>Male</option>
                                                            <option>Others</option>
                                                        </select> */}
                            <Select
                              className="w-100 local-forms select"
                              value={selectedOption1}
                              onChange={handleOption1Change}
                              options={options1}
                              placeholder="Select Gender"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms calendar-icon">
                            <label>
                              Date Of Birth{" "}
                              <span className="login-danger">*</span>
                            </label>
                            {/* <input
                                                            className="form-control datetimepicker"
                                                            type="text"
                                                            placeholder="DD-MM-YYYY"
                                                        /> */}
                            <DatePicker
                              className="form-control datetimepicker"
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>Roll </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={12450687}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Blood Group{" "}
                              <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Please Select Group </option>
                                                            <option>B+</option>
                                                            <option>A+</option>
                                                            <option>O+</option>
                                                        </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedOption2}
                              onChange={handleOption2Change}
                              options={options2}
                              placeholder="Please Select Group"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Religion <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Please Select Religion</option>
                                                            <option>Hindu</option>
                                                            <option>Christian</option>
                                                            <option>Others</option>
                                                        </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedOption3}
                              onChange={handleOption3Change}
                              options={options3}
                              placeholder="Please Select Religion"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              E-Mail <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="example@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Class <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Please Select Class</option>
                                                            <option>12</option>
                                                            <option>11</option>
                                                            <option>10</option>
                                                        </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedOption4}
                              onChange={handleOption4Change}
                              options={options4}
                              placeholder="Please Select Class"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Section <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Please Select Section </option>
                                                            <option>B</option>
                                                            <option>A</option>
                                                            <option>C</option>
                                                        </select> */}
                            <Select
                              className="w-100 select"
                              value={selectedOption5}
                              onChange={handleOption5Change}
                              options={options5}
                              placeholder="Please Select Section"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>Admission ID </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue={1426539}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>Phone </label>
                            <input
                              className="form-control"
                              type="text"
                              defaultValue="+1 888 888 8888"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group students-up-files">
                            <label>Upload Student Photo (150px X 150px)</label>
                            <div className="uplod">
                              <label className="file-upload image-upbtn mb-0">
                                Choose File <input type="file" />
                              </label>
                            </div>
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

export default EditStudent;
