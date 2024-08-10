import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './calendar.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  RHFTextField,
  FormProvider,
  RHFChipSelect,
  RHFSelect,
} from '../../HookForm/index';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
const Calendar = () => {
  const calendarRef = useRef();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  const showModalMethod = () => setIsAddEventDialogOpen(!isAddEventDialogOpen);

  // const handleViewChange = (event) => {
  //   const calendarApi = calendarRef.current.getApi();
  //   calendarApi.changeView(event.target.value);
  // };

  const handleSelect = (info) => {
    setCurrentEvent(info);
    const calendarApi = calendarRef.current.getApi();
    console.log({ calendarApi, info });
    showModalMethod();
    // const { start, end } = info;
    // const eventNamePrompt = prompt('Enter, event name');
    // if (eventNamePrompt) {
    //   setEvents([
    //     ...events,
    //     {
    //       start,
    //       end,
    //       title: eventNamePrompt,
    //       id: (Math.random() + 1).toString(36).substring(2),
    //     },
    //   ]);
    // }
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
        <EventDialog
          isShowModal={isAddEventDialogOpen}
          showModalMethod={showModalMethod}
        />
      </div>
    </div>
  );
};

const EventDialog = (props) => {
  const { isShowModal, showModalMethod } = props;
  const events = ['class', 'event', 'extra class'];
  // const saveEvent = () => {};

  const methods = useForm();

  const { handleSubmit } = methods;

  const addEvent = (data) => {
    console.log(data);
  };

  return (
    <Dialog open={isShowModal} onClose={showModalMethod}>
      <FormProvider methods={methods} onSubmit={handleSubmit(addEvent)}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Typography variant="h6">Add Title</Typography>
          <IconButton onClick={showModalMethod}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <RHFTextField
            name="eventName"
            size="small"
            variant="filled"
            label="Title"
          />
          <Select></Select>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={showModalMethod}>
            Cancel
          </Button>

          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default Calendar;
