import { Button, Tooltip } from 'antd';
import { useState } from 'react';
import { FiDelete, FiEdit } from 'react-icons/fi';

const RepeatingSubjects = (props) => {
  const { repeatingSubjects, studentId, handleFetchStudentDetails } = props;

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Group',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Repeat year',
      dataIndex: 'repeatYear',
      key: 'repeatYear',
    },
    {
      title: 'Repeat semester',
      dataIndex: 'repeatSemester',
      key: 'repeatSemester',
    },
    {
      title: 'Status',
      dataIndex: 'hasPassed',
      key: 'hasPassed',
      render: (_, { status }) => {
        let color = status ? 'green' : 'volcano';
        return (
          <Tag color={color} key={status}>
            {status ? 'Passed' : 'Repeating'}
          </Tag>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Update">
              <Button
                type="primary"
                shape="circle"
                icon={<FiEdit size="14px" />}
              />
            </Tooltip>
            <Tooltip title="Update">
              <Button
                type="primary"
                shape="circle"
                icon={<FiDelete size="14px" />}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const [isRepeatSubjectDialogVisible, setIsRepeatSubjectDialogVisible] =
    useState(false);

  const handleOpenAddRepeatSubjectDialog = () => {
    setIsRepeatSubjectDialogVisible(!isRepeatSubjectDialogVisible);
  };

  return (
    <div className="student-personals-grp" style={{ marginTop: '5px' }}>
      {isRepeatSubjectDialogVisible && (
        <RepeatSubjectDialog
          isShowModal={isRepeatSubjectDialogVisible}
          showModalMethod={handleOpenAddRepeatSubjectDialog}
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
              <h5>Repeating Subjects</h5>
            </div>
            <div>
              <Button
                onClick={handleOpenAddRepeatSubjectDialog}
                type="primary"
                style={{ marginBottom: 16 }}>
                Add a subject
              </Button>
              <Table columns={columns} dataSource={repeatingSubjects} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatingSubjects;
