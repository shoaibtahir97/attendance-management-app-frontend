import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { useState } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import useNotification from '../../../../hooks/useNotification';
import { useToggleFailedSubjectStatusMutation } from '../../../../redux/slices/apiSlices/studentApiSlice';
import RepeatSubjectDialog from './RepeatSubjectDialog';

const RepeatingSubjects = (props) => {
  const { studentData, studentId, handleFetchStudentDetails } = props;

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <p>{text.name}</p>,
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
      render: (text) => <p>{text.name}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'hasPassed',
      key: 'hasPassed',
      render: (_, { hasPassed }) => {
        let color = hasPassed ? 'green' : 'volcano';
        return (
          <Tag color={color} key={hasPassed}>
            {hasPassed ? 'Passed' : 'Failed'}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const handleEditRepeatingSubject = () => {
          setSelectedRepeatSubject({
            ...record,
            group: record.group._id,
            subject: record.subject._id,
          });
        };

        return (
          <Space size="middle">
            <Tooltip title="Update">
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<FiEdit size="14px" />}
                onClick={() => {
                  handleEditRepeatingSubject();
                  handleOpenAddRepeatSubjectDialog();
                }}
              />
            </Tooltip>
            <Tooltip title={record.hasPassed ? 'Mark as Fail' : 'Mark as Pass'}>
              <Button
                size="small"
                type="primary"
                shape="circle"
                color={record.hasPassed ? 'primary' : 'danger'}
                onClick={() =>
                  handleToggleFailedSubjectStatus({
                    hasPassed: !record.hasPassed,
                    repeatSubjectId: record._id,
                  })
                }
                icon={
                  record.hasPassed ? (
                    <FaRegTimesCircle size="14px" />
                  ) : (
                    <FaRegCheckCircle size="14px" />
                  )
                }
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];
  const [toggleFailedSubjectStatus] = useToggleFailedSubjectStatusMutation();
  const { openNotification } = useNotification();
  const [selectedRepeatSubject, setSelectedRepeatSubject] = useState(null);

  const [isRepeatSubjectDialogVisible, setIsRepeatSubjectDialogVisible] =
    useState(false);

  const handleOpenAddRepeatSubjectDialog = () => {
    setIsRepeatSubjectDialogVisible(!isRepeatSubjectDialogVisible);
  };

  const handleToggleFailedSubjectStatus = (data) => {
    toggleFailedSubjectStatus({ ...data, studentId })
      .unwrap()
      .then((res) => {
        openNotification('success', res.message);
        handleFetchStudentDetails();
      })
      .catch((err) => {
        openNotification('error', err.data.message);
      });
  };

  return (
    <div className="student-personals-grp" style={{ marginTop: '5px' }}>
      {isRepeatSubjectDialogVisible && (
        <RepeatSubjectDialog
          isShowModal={isRepeatSubjectDialogVisible}
          showModalMethod={handleOpenAddRepeatSubjectDialog}
          studentId={studentId}
          handleFetchStudentDetails={handleFetchStudentDetails}
          editRepeatSubject={selectedRepeatSubject}
        />
      )}
      <div className="card mb-0">
        <div className="card-body">
          <div className="hello-park">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <h5>Failed Subjects</h5>
              <Button
                onClick={() => {
                  setSelectedRepeatSubject(null);
                  handleOpenAddRepeatSubjectDialog();
                }}
                type="primary"
                style={{ marginBottom: 16 }}>
                Add subject
              </Button>
            </div>
            <div>
              <Table
                size="small"
                columns={columns}
                dataSource={studentData?.repeatingSubjects ?? null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatingSubjects;
