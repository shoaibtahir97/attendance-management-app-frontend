import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  RHFTextField,
  FormProvider,
  RHFChipSelect,
  RHFSelect,
  RHFDatePicker,
  RHFTimePicker,
  RHFCheckbox,
  RHFAutocomplete,
} from '../../components/HookForm';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  getDay,
  getDayOfWeek,
  getFormattedDate,
  getFormattedTime,
} from '../../utils/formatDateTime';
import dayjs from 'dayjs';
import { Alert, Button } from 'antd';
import UploadTimetableModal from './components/UploadTimetableModal';
import {
  useLazyGetTeacherTimeTableQuery,
  useLazyGetTimetableQuery,
} from '../../redux/slices/apiSlices/timetableApiSlice';
import { useSelector } from 'react-redux';
import useNotification from '../../hooks/useNotification';
import CalendarSkeleton from './components/CalendarSkeleton';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';

const Calendar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { openNotification } = useNotification();
  const navigate = useNavigate();
  const [
    getTeacherTimetable,
    {
      data: teacherTimetable,
      isLoading: loadingTeacherTimetable,
      error: teacherTimetableError,
    },
  ] = useLazyGetTeacherTimeTableQuery();
  const [getTimetable, { data, isLoading, error }] = useLazyGetTimetableQuery();
  const calendarRef = useRef();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState();

  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [isUploadTimetableModalVisible, setIsUploadTimetableModalVisible] =
    useState(false);
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] =
    useState(false);
  const showModalMethod = () => setIsAddEventDialogOpen(!isAddEventDialogOpen);

  const handleSelect = (info) => {
    setCurrentEvent(info);
    const calendarApi = calendarRef.current.getApi();
    showModalMethod();
  };

  const handleEventClick = (eventInfo) => {
    const event = eventInfo.event;

    const [group, subject, teacher] = event.title.split('\n');

    if (
      event.title.startsWith('Group') &&
      userInfo.role === 'teacher' &&
      new Date(event._instance.range.start) == new Date()
    ) {
      navigate(PATH_DASHBOARD.markattendance, {
        state: {
          group: group.split(':')[1],
          groupId: event.groupId,
          startTime: event._instance.range.start.toISOString(),
          endTime: event._instance.range.end.toISOString(),
          subject: subject.split(':')[1],
          teacher: teacher.split(':')[1],
          subjectId: event.extendedProps.subjectId,
        },
      });
    } else if (event.title.startsWith('Group') && userInfo.role === 'admin') {
      navigate(PATH_DASHBOARD.markattendance, {
        state: {
          group: group.split(':')[1],
          groupId: event.groupId,
          startTime: event._instance.range.start.toISOString(),
          endTime: event._instance.range.end.toISOString(),
          subject: subject.split(':')[1],
          teacher: teacher.split(':')[1],
          subjectId: event.extendedProps.subjectId,
        },
      });
    } else {
      openNotification('error', 'Access denied');
    }
  };

  const handleShowUploadTimetableModal = () =>
    setIsUploadTimetableModalVisible(!isUploadTimetableModalVisible);

  // const getNextDayOfWeek = (dayOfWeek) => {
  //   const daysOfWeekMap = {
  //     Monday: 1,
  //     Tuesday: 2,
  //     Wednesday: 3,
  //     Thursday: 4,
  //     Friday: 5,
  //     Saturday: 6,
  //     Sunday: 0,
  //   };

  //   const today = new Date();
  //   const currentDayOfWeek = today.getDay();
  //   const targetDayOfWeek = daysOfWeekMap[dayOfWeek];
  //   const differenceInDays = (targetDayOfWeek + 7 - currentDayOfWeek) % 7;

  //   const nextDay = new Date();
  //   nextDay.setDate(today.getDate() + differenceInDays);

  //   return nextDay.toISOString().split('T')[0];
  // };

  // All Time Tables for Admin

  const fetchAllTimeTables = async () => {
    await getTimetable()
      .unwrap()
      .then((res) => {
        const updatedEvents = [];
        res?.data?.forEach((item) => {
          item?.entries?.forEach((entry) => {
            updatedEvents.push({
              title: `Group: ${item?.group?.name} \n Subject: ${entry?.subject?.name} \n Teacher: ${entry?.teacher?.firstName} ${entry?.teacher?.lastName}`,
              startTime: `${entry?.startTime}:00`,
              endTime: `${entry?.endTime}:00`,
              groupId: item?.group?._id,
              subjectId: entry?.subject?._id,
              allDay: false,
              daysOfWeek: [`${getDayOfWeek(entry?.dayOfWeek)}`],
            });
          });
        });
        console.log('updatedEvents', updatedEvents);
        setEvents(updatedEvents);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  // Single Time Table for Teacher
  const fetchTeacherTimeTable = async () => {
    await getTeacherTimetable()
      .unwrap()
      .then((res) => {
        const events = [];
        res.data.forEach((item) => {
          item.entries.forEach((entry) => {
            events.push({
              title: `Group: ${item.group.name} \n Subject: ${entry.subject.name} \n Teacher: ${entry.teacher.firstName} ${entry.teacher.lastName}`,
              startTime: `${entry.startTime}:00`,
              endTime: `${entry.endTime}:00`,
              groupId: item.group._id,
              subjectId: entry.subject._id,
              allDay: false,
              daysOfWeek: [`${getDayOfWeek(entry.dayOfWeek)}`],
            });
          });
        });
        setEvents(events);
      })
      .catch((err) => {
        openNotification('error', err?.data?.message || err?.error);
      });
  };

  useEffect(() => {
    if (userInfo.role === 'admin') {
      fetchAllTimeTables();
    } else {
      fetchTeacherTimeTable();
    }
  }, []);

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
                    loading={false}
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
        {isLoading || loadingTeacherTimetable ? (
          <CalendarSkeleton />
        ) : error || teacherTimetableError ? (
          <Alert
            message="Error"
            description={
              error?.data?.message || teacherTimetableError.data.message
            }
            type="error"
            showIcon
          />
        ) : (
          <FullCalendar
            ref={calendarRef}
            editable
            selectable
            events={events}
            select={handleSelect}
            eventClick={handleEventClick}
            // eventContent={renderEventComponent}
            headerToolbar={{
              left: 'today prev next title',
              center: '',
              right: 'dayGridMonth timeGridWeek timeGridDay',
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            allDaySlot={false}
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
          />
        )}
      </div>
      <div>
        {currentEvent && (
          <EventDialog
            isShowModal={isAddEventDialogOpen}
            showModalMethod={showModalMethod}
            currentEvent={currentEvent}
            setEvents={setEvents}
            events={events}
          />
        )}
      </div>
    </div>
  );
};

const EventDialog = (props) => {
  const {
    isShowModal,
    showModalMethod,
    currentEvent,
    setEvents,
    events: createdEvents,
  } = props;
  const events = [
    { value: 'class', label: 'Class' },
    { value: 'event', label: 'Event' },
    { value: 'extraClass', label: 'Extra class' },
  ];

  const teachers = [
    { value: 'John', label: 'John' },
    { value: 'Eric', label: 'Eric' },
    { value: 'Donald', label: 'Donald' },
    { value: 'Susan', label: 'Susan' },
    { value: 'Jessica', label: 'Jessica' },
  ];

  const groups = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
  ];

  const repeat = [
    { value: '', label: 'Does not repeat' },
    { value: '', label: 'Daily' },
    { value: '', label: `Weekly on ${getDay(currentEvent?.startStr)}` },
    { value: '', label: 'Every weekday' },
  ];

  const closeModal = () => {
    showModalMethod();
    reset({}, { keepValues: false });
  };

  const defaultValues = {
    title: '',
    eventType: '',
    start: dayjs(currentEvent?.startStr),
    startTime: dayjs(currentEvent?.start),
    endTime: dayjs(currentEvent?.end),
    allDay: currentEvent?.allDay,
    teacher: '',
    group: '',
    repeat: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit, reset, getValues } = methods;
  const eventType = watch('eventType');

  const addEvent = (data) => {
    const newEvent = {
      id: (Math.random() + 1).toString(36).substring(2),
      start: data.startTime.$d, // Use the formatted start date
      end: data.endTime.$d, // Use the formatted end date
      title: data.title,
      allDay: data.allDay,
    };

    setEvents([...createdEvents, newEvent]);
    localStorage.setItem(
      'events',
      JSON.stringify([...createdEvents, { ...newEvent }])
    );

    closeModal();
  };

  useEffect(() => {
    if (currentEvent) {
      const newDefaultValues = {
        title: currentEvent.title || '',
        eventType: currentEvent.eventType || '',
        start: dayjs(currentEvent.startStr),
        startTime: dayjs(currentEvent.start),
        endTime: dayjs(currentEvent.end),
        allDay: currentEvent.allDay || false,
        teacher: currentEvent.teacher || '',
        group: currentEvent.group || '',
        repeat: currentEvent.repeat || '',
      };
      reset(newDefaultValues); // Reset the form with the new values
    }
  }, [currentEvent, reset]);

  return (
    <Dialog open={isShowModal} onClose={closeModal} maxWidth="sm" fullWidth>
      <FormProvider methods={methods}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant="subtitle1">Add Event</Typography>
          <IconButton onClick={closeModal}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack direction="column" alignItems="flex-start" spacing={1}>
            <RHFTextField
              name="title"
              size="small"
              variant="outlined"
              label="Title"
            />
            <RHFSelect
              name="eventType"
              size="small"
              label={'Event type'}
              options={events}
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}>
              <RHFDatePicker name="start" label="Event date" />
              <RHFTimePicker name="startTime" label="Event start time" />
              <RHFTimePicker name="endTime" label="Event end time" />
            </Stack>

            <RHFCheckbox name="allDay" label="All day" />

            {eventType === 'class' || eventType == 'extraClass' ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
                sx={{ width: '100%' }}>
                <RHFAutocomplete
                  name="teacher"
                  label="Teacher"
                  options={teachers}
                  sx={{ width: '250px' }}
                />
                <RHFAutocomplete
                  name="group"
                  label="Group"
                  options={groups}
                  sx={{ width: '250px' }}
                />
              </Stack>
            ) : (
              <></>
            )}
            {/* <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              
            >
              {repeat[0].label}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              {repeat.map((item, index) => (
                <MenuItem
                // onClick={() => handleClose(item.value)}
                >
                  {item.label}
                </MenuItem>
              ))}
              {/* <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem> 
            </Menu> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit(addEvent)}>
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

const CustomEvent = ({ event }) => {
  const { title, extendedProps } = event;
  return (
    <div
      style={{
        padding: '5px',
        backgroundColor: '#dfe7fd',
        borderRadius: '4px',
      }}>
      <strong>{title}</strong>
      <div>Group: {extendedProps.groupName}</div>
      <div>Teacher: {extendedProps.teacherName}</div>
    </div>
  );
};

export default Calendar;
