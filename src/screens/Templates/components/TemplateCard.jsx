import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteConfirmationDialog from '../../../components/DeleteConfirmationDialog';
import useNotification from '../../../hooks/useNotification';
import { useDeleteTemplateMutation } from '../../../redux/slices/apiSlices/templateApiSlice';
import { PATH_DASHBOARD } from '../../../routes/paths';

const TemplateCard = (props) => {
  const {
    template: { name, content, createdBy, updatedAt, isActive, _id },
    fetchTemplates,
  } = props;
  const { openNotification } = useNotification();
  const [deleteTemplate, { isLoading, error }] = useDeleteTemplateMutation();
  const [isDeleteTemplateModalVisible, setIsDeleteTemplateModalVisible] =
    useState(false);

  const handleToggleDeleteTemplateModalVisible = () =>
    setIsDeleteTemplateModalVisible(!isDeleteTemplateModalVisible);

  const handleDeleteTemplate = async () => {
    await deleteTemplate(_id)
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        fetchTemplates();
        handleToggleDeleteTemplateModalVisible();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  return (
    <div className="col-md-6 col-xl-4 col-sm-12 d-flex">
      <DeleteConfirmationDialog
        isShowModal={isDeleteTemplateModalVisible}
        showModalMethod={handleToggleDeleteTemplateModalVisible}
        dialogTitle="Delete Template"
        deleteWarning="Are you sure you want to delete this template? Once deleted, it cannot be recovered"
        deleteLoader={isLoading}
        handleDelete={handleDeleteTemplate}
      />
      <div className="blog grid-blog flex-fill">
        {/* <div className="blog-image">
          <Link to={`${PATH_DASHBOARD.templateDetails}/${_id}`}>
            <div style={{}}>
              <img className="img-fluid" src={blog6} alt="Post Image" />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                {content.replace(/<\/?[^>]+(>|$)/g, '')}
              </div>
            </div>
          </Link>
        </div> */}
        <div className="blog-content">
          <ul className="entry-meta meta-item">
            <li>
              <div className="post-author">
                {/* <img src={avatar01} alt="Post Author" /> */}
                <span>
                  <span className="post-title">
                    {`${createdBy.firstName} ${createdBy.lastName}`}
                  </span>
                  <span className="post-date">
                    <i className="far fa-clock" />{' '}
                    {dayjs(updatedAt).format('DD-MM-YYYY')}
                  </span>
                </span>
              </div>
            </li>
          </ul>
          <h3 className="blog-title">{name}</h3>
          <p>
            {content.length > 100
              ? `${content.slice(0, 100).replace(/<\/?[^>]+(>|$)/g, '')}...`
              : content.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>
        </div>
        <div className="row">
          <div className="edit-options">
            <div className="edit-delete-btn fetrash">
              <Link
                to={`${PATH_DASHBOARD.templateEdit}/${_id}`}
                className="text-success">
                <i className="feather-edit-3 me-1 blog-edit">
                  <FeatherIcon icon="edit-3" className="blog-edit" />
                  Edit
                </i>
              </Link>
              <Link
                onClick={handleToggleDeleteTemplateModalVisible}
                className="text-danger">
                <i className="feather-trash-2 me-1 blog-trash">
                  <FeatherIcon icon="trash-2" className="blog-trash" />
                  Delete
                </i>
              </Link>
            </div>
            <div className="text-end inactive-style">
              <div className={isActive ? 'text-success' : 'text-danger'}>
                <i
                  className={`${isActive ? 'feather-eye' : 'feather-eye-off'} me-1`}>
                  <FeatherIcon icon="eye-off" />
                  {isActive ? 'Active' : 'Inactive'}
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
