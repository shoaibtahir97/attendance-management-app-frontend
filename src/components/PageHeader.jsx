import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = (props) => {
  const { currentSection, pageTitle, parentRoute, parentSection } = props;
  return (
    <div className="page-header">
      <div className="row align-items-center">
        <div className="col-sm-12">
          <div className="page-sub-header">
            <h3 className="page-title">{pageTitle}</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={parentRoute}>{parentSection}</Link>
              </li>
              <li className="breadcrumb-item active">{currentSection}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
