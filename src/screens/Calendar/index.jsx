// Third-party
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Alert, Button } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Internal
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../routes/paths';
import './calendar.css';
import CalendarSkeleton from './components/CalendarSkeleton';
import { UploadTimetableModal } from './components/UploadTimetableModal';
import { useGetTimetable } from './hooks/useGetTimetable';

const Calendar = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const calendarRef = useRef();
  const { error, events, isLoading, handleDateSet, attendanceMap } =
    useGetTimetable(userInfo);

  const [isUploadTimetableModalVisible, setIsUploadTimetableModalVisible] =
    useState(false);

  const handleEventClick = (eventInfo) => {
    const event = eventInfo.event;

    const [group, subject, teacher] = event.title.split('\n');

    navigate(PATH_DASHBOARD.markattendance, {
      state: {
        group: group.split(':')[1],
        groupId: event.groupId,
        startTime: event._instance.range.start.toISOString(),
        endTime: event._instance.range.end.toISOString(),
        subject: subject.split(':')[1],
        teacher: teacher.split(':')[1],
        subjectId: event.extendedProps.subjectId,
        course: event.extendedProps.course,
      },
    });
  };

  const handleShowUploadTimetableModal = () =>
    setIsUploadTimetableModalVisible(!isUploadTimetableModalVisible);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row align-items-center">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Calendar</h3>
              <div className="breadcrumb">
                {userInfo.role === 'admin' && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleShowUploadTimetableModal}>
                    Upload Timetable
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUploadTimetableModalVisible && (
        <UploadTimetableModal
          showModalMethod={handleShowUploadTimetableModal}
          isShowModal={isUploadTimetableModalVisible}
          fetchAllTimeTables={fetchAllTimeTables}
        />
      )}

      <div>
        {isLoading ? (
          <CalendarSkeleton />
        ) : error ? (
          <Alert
            message="Error"
            description={error?.data?.message}
            type="error"
            showIcon
          />
        ) : (
          <FullCalendar
            ref={calendarRef}
            editable
            selectable
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
              left: 'today prev next title',
              center: '',
              right: 'dayGridMonth timeGridWeek timeGridDay',
            }}
            eventDisplay="block"
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
            initialView="dayGridMonth"
            viewHeight={'100vh'}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false, // Set to false for 24-hour format
            }}
            slotMinTime="09:30:00"
            slotMaxTime="22:00:00"
            slotDuration="01:00:00"
            weekends={true}
            dayHeaderFormat={{
              weekday: 'short',
              day: 'numeric',
              omitCommas: true,
            }}
            plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
            views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
            datesSet={handleDateSet}
            eventDidMount={(info) => {
              console.log('groupId', info.event.groupId);
              const key = `${info.event.groupId}_${info.event.extendedProps.subjectId}_${dayjs(info.event.start).format('YYYY-MM-DD')}`;

              const isAttendanceMarked = attendanceMap?.has(key);
              console.log({ key, isAttendanceMarked });
              const isPast = dayjs(info.event.start).isBefore(dayjs(), 'day');

              info.el.style.backgroundColor = isAttendanceMarked
                ? '#16a34a'
                : isPast
                  ? '#ef4444'
                  : '#f59e0b';
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
