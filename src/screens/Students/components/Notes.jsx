import { Button } from 'antd';
import React from 'react';

const Notes = (props) => {
  const { notes } = props;
  return (
    <div className="student-personals-grp" style={{ marginTop: '5px' }}>
      <div className="card mb-0">
        <div className="card-body">
          <div className="hello-park">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}>
              <h5>Notes</h5>
              <Button
                // loading={isIssuingWarningLetter}
                // onClick={handleIssueWarningLetter}
                // disabled={data?.numOfWarningLettersIssued?.length === 3}
                type="primary">
                Add Note
              </Button>
            </div>
            {/* {notes?.length > 0 ? (
              <div className="educate-year">
                <Timeline
                  items={data?.not?.map(
                    (warningLetter) => ({
                      children: `${warningLetter.type} Warning letter ${dayjs(warningLetter.createAt).format('DD-MM-YYYY')}`,
                    })
                  )}
                />
              </div>
            ) : (
              <div>No Notes Found</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
