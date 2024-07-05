import React, { useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { Link } from "react-router-dom";
import Select from "react-select";
const AddBook = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const languageOptions = [
    { value: 1, label: "English" },
    { value: 2, label: "Turkish" },
    { value: 3, label: "Chinese" },
    { value: 4, label: "Spanish" },
    { value: 5, label: "Arabic" },
  ];

  const classOptions = [
    { value: 1, label: "LKG" },
    { value: 2, label: "UKG" },
    { value: 3, label: "1" },
    { value: 4, label: "2" },
    { value: 5, label: "3" },
    { value: 6, label: "4" },
    { value: 7, label: "5" },
    { value: 8, label: "6" },
    { value: 9, label: "7" },
    { value: 10, label: "8" },
    { value: 11, label: "9" },
    { value: 12, label: "10" },
    { value: 13, label: "11" },
    { value: 14, label: "12" },
  ];

  const typeOptions = [
    { value: 1, label: "Book" },
    { value: 2, label: "DVD" },
    { value: 3, label: "CD" },
    { value: 4, label: "Newspaper" },
  ];

  const statusOptions = [
    { value: 1, label: "Select Status" },
    { value: 2, label: "In Stock" },
    { value: 3, label: "Out of Stock" },
  ];

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
  };

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  return (
    <div>
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
                    <h3 className="page-title">Add Books</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/librarylist">Library</Link>
                      </li>
                      <li className="breadcrumb-item active">Add Books</li>
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
                              <span>Book Information</span>
                            </h5>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Book ID <span className="login-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Book Name{" "}
                                <span className="login-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Language <span className="login-danger">*</span>
                              </label>
                              <Select
                                className="select"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                options={languageOptions}
                                placeholder="Select Languages"
                              />
                              {/* <select className="form-control select">
                      <option>Select Language</option>
                      <option>English</option>
                      <option>Turkish</option>
                      <option>Chinese</option>
                      <option>Spanish</option>
                      <option>Arabic</option>
                    </select> */}
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Department{" "}
                                <span className="login-danger">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>Class</label>
                              <Select
                                className="select"
                                value={selectedClass}
                                onChange={handleClassChange}
                                options={classOptions}
                                placeholder="Select Class"
                              />
                              {/* <select className="form-control select">
                      <option>Select Class *</option>
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
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Type <span className="login-danger">*</span>
                              </label>
                              <Select
                                className="select"
                                value={selectedType}
                                onChange={handleTypeChange}
                                options={typeOptions}
                                placeholder="Select Type"
                              />
                              {/* <select className="form-control select">
                      <option>Select Type</option>
                      <option>Book</option>
                      <option>DVD</option>
                      <option>CD</option>
                      <option>Newspaper</option>
                    </select> */}
                            </div>
                          </div>
                          <div className="col-12 col-sm-4">
                            <div className="form-group local-forms">
                              <label>
                                Status <span className="login-danger">*</span>
                              </label>
                              <Select
                                className="select"
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                options={statusOptions}
                                placeholder="Select Status"
                              />
                              {/* <select className="form-control select">
                      <option>Select Status</option>
                      <option>In Stock</option>
                      <option>Out of Stock</option>
                    </select> */}
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
          {/* /Page Wrapper */}
        </div>
        {/* /Main Wrapper */}
      </>
    </div>
  );
};

export default AddBook;
