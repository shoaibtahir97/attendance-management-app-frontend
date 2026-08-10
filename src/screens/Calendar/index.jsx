// Third-party
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Alert, Button } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

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
  const timeTableAPI = useGetTimetable(userInfo);

  const {
    error,
    events,
    isLoading,
    handleDateSet,
    attendanceMap,
    fetchAllTimeTables,
  } = timeTableAPI;

  const [isUploadTimetableModalVisible, setIsUploadTimetableModalVisible] =
    useState(false);

  const handleEventClick = (eventInfo) => {
    const event = eventInfo.event;

    const [group, subject, teacher] = event.title.split('\n');

    const params = createSearchParams({
      group: group.split(':')[1].trim(),
      groupId: event.groupId,
      subject: subject.split(':')[1].trim(),
      subjectId: event.extendedProps.subjectId,
      teacher: teacher.split(':')[1].trim(),
      startTime: event._instance.range.start.toISOString(),
      endTime: event._instance.range.end.toISOString(),
      course: event.extendedProps.course,
    });

    window.open(
      `#${PATH_DASHBOARD.markattendance}?${params.toString()}`,
      '_blank'
    );
  };

  const handleShowUploadTimetableModal = () =>
    setIsUploadTimetableModalVisible(!isUploadTimetableModalVisible);

  useEffect(() => {
    calendarRef.current?.getApi()?.render();
  }, [attendanceMap]);

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
            eventClassNames={(info) => {
              const key = `${info.event.groupId}_${info.event.extendedProps.subjectId}_${dayjs(info.event.start).format('YYYY-MM-DD')}`;
              const isAttendanceMarked = attendanceMap?.has(key);
              const isPast = dayjs(info.event.start).isBefore(dayjs(), 'day');
              return isAttendanceMarked
                ? 'event-attended'
                : isPast
                  ? 'event-missed'
                  : 'event-upcoming';
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
