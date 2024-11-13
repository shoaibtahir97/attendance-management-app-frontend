import { Box, Skeleton, Stack } from '@mui/material';
import React from 'react';

const StudentProfileSkeleton = () => {
  function generate(element) {
    return [0, 1, 2, 3, 4].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="student-personals-grp">
          <div className="card">
            <div className="card-body">
              <Skeleton variant="text" height={'40px'} width={'150px'} />
              <Stack direction="column">
                {generate(
                  <Stack direction="row" spacing={1}>
                    <Skeleton
                      variant="circular"
                      width={'40px'}
                      height={'40px'}
                    />
                    <Box>
                      <Skeleton
                        variant="text"
                        width={'100px'}
                        height={'40px'}
                      />
                      <Skeleton
                        variant="text"
                        width={'100px'}
                        height={'30px'}
                      />
                    </Box>
                  </Stack>
                )}
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="student-personals-grp">
          <div className="card mb-0">
            <div className="card-body">
              <Box display="flex" justifyContent={'space-between'}>
                <Skeleton variant="text" width={'130px'} height={'50px'} />
                <Skeleton variant="text" width={'130px'} height={'50px'} />
              </Box>

              <Skeleton width={'250px'} height={'70px'} />
              <Skeleton width={'250px'} height={'70px'} />
              <Skeleton width={'250px'} height={'70px'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileSkeleton;
