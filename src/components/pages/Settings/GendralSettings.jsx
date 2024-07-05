import React, { useState } from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { favicon, logo } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import Select from "react-select";

const GendralSettings = () => {
  const [show, setShow] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const stateOptions = [
    { value: 1, label: "Select" },
    { value: 2, label: "California" },
    { value: 3, label: "Tasmania" },
    { value: 4, label: "Auckland" },
    { value: 5, label: "Marlborough" },
  ];

  const countryOptions = [
    { value: 1, label: "Select" },
    { value: 2, label: "India" },
    { value: 3, label: "London" },
    { value: 4, label: "France" },
    { value: 5, label: "USA" },
  ];

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
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
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Settings</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/generalsettings">Settings</Link>
                    </li>
                    <li className="breadcrumb-item active">General Settings</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Settings Menu */}
            <div className="settings-menu-links">
              <ul className="nav nav-tabs menu-tabs">
                <li className="nav-item active">
                  <Link className="nav-link" to="/generalsettings">
                    General Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/localization">
                    Localization
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/paymentsettings">
                    Payment Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/emailsettings">
                    Email Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/socialsettings">
                    Social Media Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sociallinks">
                    Social Links
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/seo">
                    SEO Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/othersettings">
                    Others
                  </Link>
                </li>
              </ul>
            </div>
            {/* Settings Menu */}
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Website Basic Details</h5>
                  </div>
                  <div className="card-body pt-0">
                    <form>
                      <div className="settings-form">
                        <div className="form-group">
                          <label>
                            Website Name <span className="star-red">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Website Name"
                          />
                        </div>
                        <div className="form-group">
                          <p className="settings-label">
                            Logo <span className="star-red">*</span>
                          </p>
                          <div className="settings-btn">
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              id="file"
                              onchange="loadFile(event)"
                              className="hide-input"
                            />
                            <label htmlFor="file" className="upload">
                              <i className="feather-upload">
                                <FeatherIcon icon="upload" />
                              </i>
                            </label>
                          </div>
                          <h6 className="settings-size">
                            Recommended image size is <span>150px x 150px</span>
                          </h6>
                          <div
                            className="upload-images upload-size logo"
                            style={{ display: show ? "none" : "block" }}
                          >
                            <img src={logo} alt="Image" />
                            <Link to="#" className="btn-icon logo-hide-btn">
                              <i
                                className="feather-x-circle crossmark"
                                onClick={() => setShow((s) => !s)}
                              >
                                <FeatherIcon icon="x-circle" />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className="form-group">
                          <p className="settings-label">
                            Favicon <span className="star-red">*</span>
                          </p>
                          <div className="settings-btn">
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              id="file"
                              onchange="loadFile(event)"
                              className="hide-input"
                            />
                            <label htmlFor="file" className="upload">
                              <i className="feather-upload">
                                <FeatherIcon icon="upload" />
                              </i>
                            </label>
                          </div>
                          <h6 className="settings-size">
                            Recommended image size is{" "}
                            <span>16px x 16px or 32px x 32px</span>
                          </h6>
                          <h6 className="settings-size mt-1">
                            Accepted formats: only png and ico
                          </h6>
                          <div
                            className="upload-images upload-size"
                            style={{ display: show ? "none" : "block" }}
                          >
                            <img
                              className="favicon-changes"
                              src={favicon}
                              alt="Image"
                            />
                            <Link to="#" className="btn-icon logo-hide-btn">
                              <i
                                className="feather-x-circle"
                                onClick={() => setShow((s) => !s)}
                              >
                                <FeatherIcon icon="x-circle" />
                              </i>
                            </Link>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-5 col-md-6">
                            <div className="form-group">
                              <div className="status-toggle d-flex justify-content-between align-items-center">
                                <p className="mb-0">RTL</p>
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-0">
                          <div className="settings-btns">
                            <button type="submit" className="btn btn-orange">
                              Update
                            </button>
                            <button type="submit" className="btn btn-grey">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Address Details</h5>
                  </div>
                  <div className="card-body pt-0">
                    <form>
                      <div className="settings-form">
                        <div className="form-group">
                          <label>
                            Address Line 1 <span className="star-red">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address Line 1"
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            Address Line 2 <span className="star-red">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Address Line 2"
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                City <span className="star-red">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                State/Province{" "}
                                <span className="star-red">*</span>
                              </label>
                              {/* <select className="select form-control">
                                <option selected="selected">Select</option>
                                <option>California</option>
                                <option>Tasmania</option>
                                <option>Auckland</option>
                                <option>Marlborough</option>
                              </select> */}
                              <Select
                                className="select"
                                value={selectedState}
                                onChange={handleStateChange}
                                options={stateOptions}
                                placeholder="Select"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Zip/Postal Code{" "}
                                <span className="star-red">*</span>
                              </label>
                              <input type="text" className="form-control" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Country <span className="star-red">*</span>
                              </label>
                              {/* <select className="select form-control">
                                <option selected="selected">Select</option>
                                <option>India</option>
                                <option>London</option>
                                <option>France</option>
                                <option>USA</option>
                              </select> */}
                              <Select
                                className="select"
                                value={selectedState}
                                onChange={handleStateChange}
                                options={stateOptions}
                                placeholder="Select"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-0">
                          <div className="settings-btns">
                            <button type="submit" className="btn btn-orange">
                              Update
                            </button>
                            <button type="submit" className="btn btn-grey">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* /Settings */}
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default GendralSettings;
