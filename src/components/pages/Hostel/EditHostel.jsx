import React from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";

const EditHostel = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const typeOptions = [
    { value: 1, label: "Select Type" },
    { value: 2, label: "Normal" },
    { value: 3, label: "AC" },
    { value: 4, label: "Suite" },
  ];

  const availabilityOptions = [
    { value: 1, label: "Select Availability" },
    { value: 2, label: "Available" },
    { value: 3, label: "Not Available" },
  ];

  const handleTypeChange = (selectedOption) => {
    setSelectedType(selectedOption);
  };

  const handleAvailabilityChange = (selectedOption) => {
    setSelectedAvailability(selectedOption);
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
                  <h3 className="page-title">Edit Rooms</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/hostel">Hostel</Link>
                    </li>
                    <li className="breadcrumb-item active">Edit Rooms</li>
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
                            <span>Room Information</span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Block <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="A Block"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Room No <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={101}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Room Type <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                              <option>Normal</option>
                              <option>Normal</option>
                              <option>AC</option>
                              <option>Suite</option>
                            </select> */}
                            <Select
                              className="select"
                              value={selectedType}
                              onChange={handleTypeChange}
                              options={typeOptions}
                              placeholder="Select Type"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              No of Beds <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={5}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Cose per Bed{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue="$25"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Availability{" "}
                              <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                              <option>Available</option>
                              <option>Available</option>
                              <option>Not Available</option>
                            </select> */}
                            <Select
                              className="select"
                              value={selectedAvailability}
                              onChange={handleAvailabilityChange}
                              options={availabilityOptions}
                              placeholder="Select Availability"
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

export default EditHostel;
