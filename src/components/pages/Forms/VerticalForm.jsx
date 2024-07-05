import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import Select from "react-select";
const VerticalForm = () => {
  const [selectedBg, setSelectedBg] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const bgOptions = [
    { value: 1, label: "A+" },
    { value: 2, label: "O+" },
    { value: 3, label: "B+" },
    { value: 4, label: "AB+" },
  ];

  const stateOptions = [
    { value: 1, label: "Select State" },
    { value: 2, label: "California" },
    { value: 3, label: "Texas" },
    { value: 4, label: "Florida" },
  ];

  const countryOptions = [
    { value: 1, label: "USA" },
    { value: 2, label: "France" },
    { value: 3, label: "India" },
    { value: 4, label: "Spain" },
  ];

  const handleBgChange = (selectedOption) => {
    setSelectedBg(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        {/* Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Vertical Form</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Vertical Form</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Basic Form</h5>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          autoComplete="off"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label>Repeat Password</label>
                        <input
                          type="password"
                          autoComplete="off"
                          className="form-control"
                        />
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Address Form</h5>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="form-group">
                        <label>Address Line 1</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Address Line 2</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Postal Code</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Two Column Vertical Form</h5>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <h5 className="card-title">Personal Information</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Blood Group</label>
                            <Select
                              className="w-100"
                              value={selectedBg}
                              onChange={handleBgChange}
                              options={bgOptions}
                              placeholder="Blood group"
                            />
                          </div>
                          <div className="form-group">
                            <label className="d-block">Gender:</label>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender_male"
                                value="option1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gender_male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                id="gender_female"
                                value="option2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gender_female"
                              >
                                Female
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" />
                          </div>

                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="text"
                              autoComplete="off"
                              className="form-control"
                            />
                          </div>
                          <div className="form-group">
                            <label>Repeat Password</label>
                            <input
                              type="text"
                              autoComplete="off"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <h5 className="card-title">Postal Address</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Address Line 1</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Address Line 2</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>State</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Country</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Two Column Vertical Form</h5>
                  </div>
                  <div className="card-body">
                    <form action="#">
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="card-title">Personal details</h5>
                          <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Password:</label>
                            <input
                              type="password"
                              autoComplete="off"
                              className="form-control"
                            />
                          </div>
                          <Select
                            className="w-100"
                            value={selectedState}
                            onChange={handleStateChange}
                            options={stateOptions}
                            placeholder="Select State"
                          />
                          <div className="form-group">
                            <label>Your Message:</label>
                            <textarea
                              rows="5"
                              cols="5"
                              className="form-control"
                              placeholder="Enter message"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <h5 className="card-title">Personal details</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>First Name:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Last Name:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Email:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label>Address line:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>Country:</label>
                                <Select
                                  className="w-100"
                                  value={selectedCountry}
                                  onChange={handleCountryChange}
                                  options={countryOptions}
                                  placeholder="Select Country"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>State/Province:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>ZIP code:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label>City:</label>
                                <input type="text" className="form-control" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Page wrapper */}
        </div>
      </div>
    </>
  );
};
export default VerticalForm;
