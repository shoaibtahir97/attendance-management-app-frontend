import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';
import {
  Box,
  Button,
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
} from '../../HookForm/index';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import {
  getDay,
  getFormattedDate,
  getFormattedTime,
} from '../../../utils/formatDateTime';
import dayjs from 'dayjs';
const Calendar = () => {
  const calendarRef = useRef();
  const [events, setEvents] = useState([]);

  const [currentEvent, setCurrentEvent] = useState(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  const showModalMethod = () => setIsAddEventDialogOpen(!isAddEventDialogOpen);

  const handleSelect = (info) => {
    setCurrentEvent(info);
    const calendarApi = calendarRef.current.getApi();
    showModalMethod();
  };

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">Calendar</h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FullCalendar
          ref={calendarRef}
          editable
          selectable
          events={events}
          select={handleSelect}
          headerToolbar={{
            left: 'today prev next title',
            center: '',
            right: 'dayGridMonth timeGridWeek timeGridDay',
          }}
          titleFormat={{ year: 'numeric', month: 'long' }}
          allDaySlot={false}
          viewHeight={'100vh'}
          slotMinTime="08:00:00"
          slotMaxTime="17:00:00"
          slotDuration="00:45:00"
          weekends={false}
          dayHeaderFormat={{
            weekday: 'short',
            day: 'numeric',
            omitCommas: true,
          }}
          plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
          views={['dayGridMonth', 'timeGridWeek', 'timeGridDay']}
        />
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
    reset();
  };

  const defaultValues = {
    title: '',
    eventType: '',
    start: dayjs(currentEvent?.startStr),
    startTime: dayjs(currentEvent?.startStr),
    endTime: dayjs(currentEvent?.endStr),
    allDay: currentEvent?.allDay,
    teacher: '',
    group: '',
    repeat: '',
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit, reset } = methods;

  const addEvent = (data) => {
    const newEvent = {
      id: (Math.random() + 1).toString(36).substring(2),
      start: data.startTime.$d, // Use the formatted start date
      end: data.endTime.$d, // Use the formatted end date
      title: data.title,
    };

    setEvents([...createdEvents, newEvent]);

    closeModal();
  };

  const eventType = watch('eventType');

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
