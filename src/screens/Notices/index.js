import React, { useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { PATH_DASHBOARD } from '../../routes/paths';
import { Card } from 'antd';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './notices.css';
import NoticeDialog from './NoticeDialog';

const renderNoticeComponent = (props) => {
  console.log(props);
  return <div>Notice</div>;
};

const Notices = () => {
  const calendarRef = useRef();
  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState(null);

  const [isAddNoticeDialogOpen, setIsAddNoticeDialogOpen] = useState(false);

  const showModalMethod = () =>
    setIsAddNoticeDialogOpen(!isAddNoticeDialogOpen);

  const handleSelect = (info) => {
    setCurrentNotice(info);
    calendarRef.current.getApi();
    showModalMethod();
  };

  const handleNoticeClick = (noticeInfo) => {};

  return (
    <div className="content container-fluid">
      {currentNotice && (
        <NoticeDialog
          isShowModal={isAddNoticeDialogOpen}
          showModalMethod={showModalMethod}
          currentEvent={currentNotice}
          setNotices={setNotices}
          notices={notices}
        />
      )}
      <PageHeader
        currentSection="Notices"
        pageTitle="Notices"
        parentRoute={PATH_DASHBOARD.notices}
        parentSection="Notice"
      />

      <Card>
        <FullCalendar
          ref={calendarRef}
          editable
          selectable
          events={notices}
          select={handleSelect}
          eventClick={handleNoticeClick}
          eventContent={renderNoticeComponent}
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
          views={['dayGridMonth', 'timeGridWeek']}
        />
      </Card>
    </div>
  );
};

export default Notices;
