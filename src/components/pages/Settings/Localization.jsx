import React, { useState } from "react";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import { Link } from "react-router-dom";
import Select from "react-select";
const Localization = () => {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);

  const options1 = [
    { value: 1, label: "(UTC +5:30) Antarctica/Palmer" },
    { value: 2, label: "(UTC+05:30) India" },
  ];

  const options2 = [
    { value: 1, label: "15 May 2016" },
    { value: 2, label: "15/05/2016" },
    { value: 3, label: "15.05.2016" },
    { value: 4, label: "15-05-2016" },
    { value: 5, label: "05/15/2016" },
    { value: 6, label: "2016/05/15" },
    { value: 7, label: "2016-05-15" },
  ];

  const options3 = [
    { value: 1, label: "12 Hours" },
    { value: 2, label: "24 Hours" },
    { value: 3, label: "36 Hours" },
    { value: 4, label: "48 Hours" },
    { value: 5, label: "60 Hours" },
  ];

  const options4 = [
    { value: 1, label: "$" },
    { value: 2, label: "₹" },
    { value: 3, label: "£" },
    { value: 4, label: "€" },
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
              <div className="page-header">
                <div className="row">
                  <div className="col">
                    <h3 className="page-title">Settings</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/generalsettings">Settings</Link>
                      </li>
                      <li className="breadcrumb-item active">Localization</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  {/* Settings Menu */}
                  <div className="settings-menu-links">
                    <ul className="nav nav-tabs menu-tabs">
                      <li className="nav-item">
                        <Link className="nav-link" to="/generalsettings">
                          General Settings
                        </Link>
                      </li>
                      <li className="nav-item active">
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
                          <h5 className="card-title">Localization Details</h5>
                        </div>
                        <div className="card-body pt-0">
                          <form>
                            <div className="settings-form">
                              <div className="form-group">
                                <label>Time Zone</label>
                                <Select
                                  className="select w-100"
                                  value={selectedOption1}
                                  onChange={handleOption1Change}
                                  options={options1}
                                  placeholder="(UTC +5:30) Antarctica/Palmer"
                                />
                                {/* <select className="select form-control">
                        <option selected="selected">
                          (UTC +5:30) Antarctica/Palmer
                        </option>
                        <option>(UTC+05:30) India</option>
                      </select> */}
                              </div>
                              <div className="form-group">
                                <label>Date Format</label>
                                <Select
                                  className="select w-100"
                                  value={selectedOption2}
                                  onChange={handleOption2Change}
                                  options={options2}
                                  placeholder="15 May 2016"
                                />
                                {/* <select className="select form-control">
                        <option selected="selected">15 May 2016</option>
                        <option>15/05/2016</option>
                        <option>15.05.2016</option>
                        <option>15-05-2016</option>
                        <option>05/15/2016</option>
                        <option>2016/05/15</option>
                        <option>2016-05-15</option>
                      </select> */}
                              </div>
                              <div className="form-group">
                                <label>Time Format</label>
                                {/* <select className="select form-control">
                        <option selected="selected">12 Hours</option>
                        <option>24 Hours</option>
                        <option>36 Hours</option>
                        <option>48 Hours</option>
                        <option>60 Hours</option>
                      </select> */}
                                <Select
                                  className="select w-100"
                                  value={selectedOption3}
                                  onChange={handleOption3Change}
                                  options={options3}
                                  placeholder="12 Hours"
                                />
                              </div>
                              <div className="form-group">
                                <label>Currency Symbol</label>
                                {/* <select className="select form-control">
                        <option selected="selected">$</option>
                        <option>₹</option>
                        <option>£</option>
                        <option>€</option>
                      </select> */}
                                <Select
                                  className="select w-100"
                                  value={selectedOption4}
                                  onChange={handleOption4Change}
                                  options={options4}
                                  placeholder="$"
                                />
                              </div>
                              <div className="form-group mb-0">
                                <div className="settings-btns">
                                  <button
                                    type="submit"
                                    className="btn btn-orange"
                                  >
                                    Update
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
          </div>

          {/* /Page Wrapper */}
        </div>
        {/* /Main Wrapper */}
      </>
    </div>
  );
};

export default Localization;
