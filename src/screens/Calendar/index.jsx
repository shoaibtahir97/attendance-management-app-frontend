import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Alert, Button } from 'antd';
import dayjs from 'dayjs';
import randomColor from 'randomcolor';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FormProvider,
  RHFAutocomplete,
  RHFCheckbox,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
  RHFTimePicker,
} from '../../components/HookForm';
import useNotification from '../../hooks/useNotification';
import {
  useLazyGetTeacherTimeTableQuery,
  useLazyGetTimetableQuery,
} from '../../redux/slices/apiSlices/timetableApiSlice';
import { PATH_DASHBOARD } from '../../routes/paths';
import { getDay, getDayOfWeek } from '../../utils/formatDateTime';
import './calendar.css';
import CalendarSkeleton from './components/CalendarSkeleton';
import UploadTimetableModal from './components/UploadTimetableModal';

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
      },
    });
  };

  const handleShowUploadTimetableModal = () =>
    setIsUploadTimetableModalVisible(!isUploadTimetableModalVisible);

  const fetchAllTimeTables = async () => {
    const updatedEvents = [];
    const groupColorMap = {};
    const colorPalette = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c',
      '#2ecc71',
      '#f39c12',
      '#16a085',
      '#27ae60',
      '#2980b9',
      '#8e44ad',
      '#d35400',
      '#c0392b',
      '#7f8c8d',
      '#2c3e50',
    ];
    let colorIndex = 0;

    await getTimetable()
      .unwrap()
      .then((res) => {
        res?.data?.forEach((item) => {
          const groupId = item?.group?._id;

          // Assign color if not already mapped
          if (!groupColorMap[groupId]) {
            groupColorMap[groupId] = randomColor({ luminosity: 'bright' });
            colorIndex++;
          }

          item?.entries?.forEach((entry) => {
            updatedEvents.push({
              title: `Group: ${item?.group?.name} \n Subject: ${entry?.subject?.name} \n Teacher: ${entry?.teacher?.firstName} ${entry?.teacher?.lastName}`,
              startTime: `${entry?.startTime}:00`,
              endTime: `${entry?.endTime}:00`,
              groupId: item?.group?._id,
              subjectId: entry?.subject?._id,
              allDay: false,
              daysOfWeek: [`${getDayOfWeek(entry?.dayOfWeek)}`],
              startRecur: item?.group?.cohortStartDate,
              endRecur: item?.group?.cohortEndDate,
              backgroundColor: groupColorMap[groupId],
              borderColor: groupColorMap[groupId],
              textColor: '#fff',
              color: groupColorMap[groupId],
            });
          });
        });
      })
      .catch((err) => {
        // openNotification('error', err?.data?.message ?? err?.error);
      });
    setEvents(updatedEvents);
  };

  useEffect(() => {
    if (userInfo.role === 'admin') {
      fetchAllTimeTables();
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
            // select={handleSelect}
            eventClick={handleEventClick}
            // eventContent={renderEventComponent}
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
          />
        )}
      </div>
      <div>
        {/* {currentEvent && (
          <EventDialog
            isShowModal={isAddEventDialogOpen}
            showModalMethod={showModalMethod}
            currentEvent={currentEvent}
            setEvents={setEvents}
            events={events}
          />
        )} */}
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

  // useEffect(() => {
  //   if (currentEvent) {
  //     const newDefaultValues = {
  //       title: currentEvent.title || '',
  //       eventType: currentEvent.eventType || '',
  //       start: dayjs(currentEvent.startStr),
  //       startTime: dayjs(currentEvent.start),
  //       endTime: dayjs(currentEvent.end),
  //       allDay: currentEvent.allDay || false,
  //       teacher: currentEvent.teacher || '',
  //       group: currentEvent.group || '',
  //       repeat: currentEvent.repeat || '',
  //     };
  //     reset(newDefaultValues); // Reset the form with the new values
  //   }
  // }, [reset]);

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

export default Calendar;
