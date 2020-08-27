import React, {useState, useEffect} from 'react';
import {Calendar, momentLocalizer, Views} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Modal from '../common/Modals/EventModal';
import {useWindowSize} from '../../utils/hooks/useWindowSize';
import {windowBreakPoint} from '../ScheduleCalendar/constants';
import './styles.css';

const localizer = momentLocalizer(moment);

export default function EventCalendar({eventList}) {
  const [eventsList, setEventsList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    const parsedEvents =
      eventList &&
      eventList.data &&
      eventList.data.eventStudents &&
      eventList.data.eventStudents.length &&
      eventList.data.eventStudents.map((event, index) => {
        return {
          id: index,
          title: event.description,
          start: event.start_date,
          end: event.end_date,
          event,
        };
      });
    parsedEvents.length && setEventsList(parsedEvents);
  }, [eventList]);

  const handleEventClick = (e) => {
    setActiveEvent(e);
    handleOpenCloseModal();
  };

  const handleOpenCloseModal = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  return (
    <>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          windowSize={windowSize}
          onClose={handleOpenCloseModal}
          windowBreakPoint={windowBreakPoint}
          event={activeEvent}
        />
      )}
      <Calendar
        views={[Views.MONTH]}
        localizer={localizer}
        events={eventsList}
        startAccessor="start"
        endAccessor="end"
        style={{height: 500}}
        onSelectEvent={handleEventClick}
      />
    </>
  );
}
