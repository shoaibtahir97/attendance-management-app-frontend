import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = (info) => {
    console.log({ info });
    const { start, end } = info;
    const eventNamePrompt = prompt('Enter, event name');
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: (Math.random() + 1).toString(36).substring(2),
        },
      ]);
    }
  };

  return (
    <div className='content container-fluid'>
      <div className='page-header'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='page-sub-header'>
              <h3 className='page-title'>Calendar</h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FullCalendar
          editable
          selectable
          events={events}
          select={handleSelect}
          headerToolbar={{
            start: 'today prev next',
            end: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          weekends={false}
          plugins={[daygridPlugin, interactionPlugin, timegridPlugin]}
          views={['timeGridMonth', 'timeGridWeek', 'timeGridDay']}
        />
      </div>
    </div>
  );
};

export default Calendar;
