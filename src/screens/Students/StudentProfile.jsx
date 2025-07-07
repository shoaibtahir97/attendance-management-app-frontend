import { Alert, Button, Empty, Timeline } from 'antd';
import dayjs from 'dayjs';
import FeatherIcon from 'feather-icons-react/build/FeatherIcon';
import { useEffect } from 'react';
import { MdListAlt } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import useNotification from '../../hooks/useNotification';
import { useLazyGetStudentReportQuery } from '../../redux/slices/apiSlices/reportApiSlice';
import { useLazyGetStudentDetailsQuery } from '../../redux/slices/apiSlices/studentApiSlice';
import { useIssueWarningLetterMutation } from '../../redux/slices/apiSlices/warningLetterApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import Notes from './components/notes/Notes';
import RepeatingSubjects from './components/repeatingSubjects/RepeatingSubjects';
import StudentProfileSkeleton from './components/StudentProfileSkeleton';

const StudentProfile = () => {
  const { id: studentId } = useParams();
  const { openNotification } = useNotification();
  const [getStudentDetails, { data, isLoading, error }] =
    useLazyGetStudentDetailsQuery();
  const [generateStudentReport, { isLoading: isGeneratingStudentReport }] =
    useLazyGetStudentReportQuery();

  const [issueWarningLetter, { isLoading: isIssuingWarningLetter }] =
    useIssueWarningLetterMutation();

  const warningLetterToIssue =
    data?.numOfWarningLettersIssued?.length === 0
      ? '1st'
      : data?.numOfWarningLettersIssued?.length === 1
        ? '2nd'
        : '3rd';

  const handleIssueWarningLetter = async () => {
    await issueWarningLetter({ studentId, type: warningLetterToIssue })
      .unwrap()
      .then((res) => {
        openNotification('success', res?.message);
        handleFetchStudentDetails();
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  async function handleGenerateReport() {
    await generateStudentReport({ studentId: data.studentId })
      .unwrap()
      .then((res) => {
        const url = window.URL.createObjectURL(res);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${data.firstName}_${data.lastName}.xlsx`
        ); // Specify the file name

        // Append to the document and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err);
        openNotification('error', err?.message ?? err.error);
      });
  }

  const handleFetchStudentDetails = async () => {
    await getStudentDetails(studentId);
  };

  useEffect(() => {
    handleFetchStudentDetails();
  }, []);

  return (
    <div className="content container-fluid">
      <PageHeader
        currentSection="Student Details"
        pageTitle="Student Detail"
        parentRoute={PATH_DASHBOARD.students}
        parentSection="Student"
      />

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="about-info">
                <h4>Profile </h4>
              </div>
            </div>
            <div className="col-md-6" style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="button"
                onClick={handleGenerateReport}
                loading={isGeneratingStudentReport}>
                Generate Report
              </Button>
            </div>
          </div>
          {isLoading ? (
            <StudentProfileSkeleton />
          ) : error ? (
            <Alert
              message="Error"
              type="error"
              description={error?.data?.message}
            />
          ) : (
            <div className="row">
              <div className="col-lg-4">
                <div className="student-personals-grp">
                  <div className="card">
                    <div className="card-body">
                      <div className="heading-detail">
                        <h4>Personal Details :</h4>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-user">
                            <FeatherIcon icon="user" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Name</h4>
                          <h5>{`${data?.firstName} ${data?.lastName}`}</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <MdListAlt color="#516EE4" />
                        </div>
                        <div className="views-personal">
                          <h4>Course </h4>
                          <h5>{data?.courseName?.name}</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-phone-call">
                            <FeatherIcon icon="phone-call" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Phone</h4>
                          <h5>{data?.phone}</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-mail">
                            <FeatherIcon icon="mail" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Email</h4>
                          <h5>{data?.email}</h5>
                        </div>
                      </div>
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-user">
                            <FeatherIcon icon="user" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Gender</h4>
                          <h5>{data?.gender ?? '-'}</h5>
                        </div>
                      </div>
                      {/* <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-calendar">
                            <FeatherIcon icon="calendar" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Date of Birth</h4>
                          <h5>{format(data?.DOB, 'dd MMM yyyy')}</h5>
                        </div>
                      </div> */}
                      <div className="personal-activity">
                        <div className="personal-icons">
                          <i className="feather-italic">
                            <FeatherIcon icon="italic" />
                          </i>
                        </div>
                        <div className="views-personal">
                          <h4>Nationality</h4>
                          <h5>{data?.nationality}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="student-personals-grp">
                  <div className="card mb-0">
                    <div className="card-body">
                      {/* <div className="heading-detail">
                        <h4>Attendance</h4>
                      </div>
                      <div className="hello-park"></div> */}
                      <div className="hello-park">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}>
                          <h5>Warning Letters Issued</h5>
                          <Button
                            loading={isIssuingWarningLetter}
                            onClick={handleIssueWarningLetter}
                            disabled={
                              data?.numOfWarningLettersIssued?.length === 3
                            }
                            type="primary">
                            Issue {warningLetterToIssue} warning letter
                          </Button>
                        </div>
                        {data?.numOfWarningLettersIssued?.length > 0 ? (
                          <div className="educate-year">
                            <Timeline
                              items={data?.numOfWarningLettersIssued?.map(
                                (warningLetter) => ({
                                  children: `${warningLetter.type} Warning letter ${dayjs(warningLetter.createAt).format('DD-MM-YYYY')}`,
                                })
                              )}
                            />
                          </div>
                        ) : (
                          <Empty />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <Notes
                  notes={data?.notes}
                  studentId={studentId}
                  handleFetchStudentDetails={handleFetchStudentDetails}
                />
              </div>
              <div className="col-lg-12">
                <RepeatingSubjects
                  studentData={data}
                  studentId={studentId}
                  handleFetchStudentDetails={handleFetchStudentDetails}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
