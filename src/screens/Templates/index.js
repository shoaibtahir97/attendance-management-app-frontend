import { Alert, Empty, Pagination } from 'antd';
import FeatherIcon from 'feather-icons-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyGetTemplatesQuery } from '../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import TemplateCard from './components/TemplateCard';

const Templates = () => {
  const [getTemplates, { data, isLoading, error }] = useLazyGetTemplatesQuery();

  const [query, setQuery] = useState({
    isActive: true,
    name: '',
    page: 1,
    rowsPerPage: 10,
  });

  const handleChangePagination = (page) => {
    setQuery({ ...query, page });
  };

  const fetchTemplates = async () => {
    await getTemplates(query)
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTemplates();
  }, [query]);

  return (
    <div className="content container-fluid">
      {/* Blog List */}
      <div className="row">
        <div className="col-md-9">
          <ul className="list-links mb-4">
            <li className={query.isActive ? 'active' : ''}>
              <Link
                onClick={() => {
                  setQuery({ ...query, isActive: true });
                }}>
                Active Template
              </Link>
            </li>
            <li className={!query.isActive ? 'active' : ''}>
              <Link
                onClick={() => {
                  setQuery({ ...query, isActive: false });
                }}>
                Inactive Template
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-3 text-md-end">
          <Link
            to={`${PATH_DASHBOARD.templates}/add`}
            className="btn btn-primary btn-blog mb-3">
            <i className="feather-plus-circle me-1">
              <FeatherIcon icon="plus-circle" />
              Add New Template
            </i>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <>Loading...</>
      ) : error ? (
        <Alert message="Error" type="error" description={error.data?.message} />
      ) : (
        <div className="row">
          <div className="row">
            {/* Blog Post */}
            {data && data.templates && data.templates.length > 0 ? (
              data.templates.map((template) => (
                <TemplateCard
                  key={template._id}
                  template={template}
                  fetchTemplates={fetchTemplates}
                />
              ))
            ) : (
              <Empty />
            )}
          </div>

          <div className="row ">
            <div className="col-md-12">
              <div className="pagination-tab  d-flex justify-content-center">
                <Pagination
                  defaultCurrent={query.page}
                  onChange={handleChangePagination}
                  total={data?.filteredTemplatesCount}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      <div
        className="modal fade contentmodal"
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header pb-0 border-bottom-0  justify-content-end">
              <button
                type="button"
                className="close-btn"
                data-bs-dismiss="modal"
                aria-label="Close">
                <i className="feather-x-circle" />
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-wrap text-center">
                <div className="del-icon">
                  <i className="feather-x-circle" />
                </div>
                <h2>Sure you want to delete</h2>
                <div className="submit-section">
                  <Link to="/blog" className="btn btn-success me-2">
                    Yes
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-danger"
                    data-bs-dismiss="modal">
                    No
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Modal */}
    </div>
  );
};

export default Templates;
