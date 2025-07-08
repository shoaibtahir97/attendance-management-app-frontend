import { Button, Table, Tooltip } from 'antd';
import { useState } from 'react';
import { FiDelete, FiEdit } from 'react-icons/fi';
import RepeatSubjectDialog from './RepeatSubjectDialog';

const RepeatingSubjects = (props) => {
  const { studentData, studentId, handleFetchStudentDetails } = props;

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
        const handleEditRepeatingSubject = () => {};
        return (
          <Space size="middle">
            <Tooltip title="Update">
              <Button
                type="primary"
                shape="circle"
                icon={<FiEdit size="14px" />}
                onClick={handleEditRepeatingSubject}
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
              <h5>Failed Subjects</h5>
              <Button
                onClick={handleOpenAddRepeatSubjectDialog}
                type="primary"
                style={{ marginBottom: 16 }}>
                Add subject
              </Button>
            </div>
            <div>
              <Table
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
