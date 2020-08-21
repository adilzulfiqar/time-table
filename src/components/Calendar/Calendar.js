import React, {useState, useEffect} from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import {LightenDarkenColor} from 'lighten-darken-color';
import 'react-week-calendar/dist/style.css';
import Modal from '../common/Modal';
import {getRandomColor} from '../../utils/utils';
import {colors} from '../../temp/sampleJSON';
import './styles.css';

const renderEventComponent = (event) => {
  return (
    <div
      className="event"
      style={{
        background: event.bgColor,
        borderBottom: `4px solid ${LightenDarkenColor(event.bgColor, -50)}`,
      }}>
      <span className="event-time">
        {moment(event.start).format('HH:mm')} -{' '}
        {moment(event.end).format('HH:mm')}
      </span>
      <br />
      <span className="event-value">{event.value}</span>
    </div>
  );
};

const parseEventsData = (events, firstDayOfWeek) => {
  return events.map((event) => {
    let startDate = moment(firstDayOfWeek)
      .add(event.day - 1, 'day')
      .format('YYYY-MM-DD');
    let start_time = moment(firstDayOfWeek)
      .add(event.day - 1, 'day')
      .format('YYYY-MM-DD');

    const start = moment(`${startDate} ${event.start_time}`);
    const end = moment(`${start_time} ${event.end_time}`);

    return {start, end, value: event.name, bgColor: getRandomColor(colors)};
  });
};

function Calendar({sampleJSON}) {
  const firstDayOfWeek = moment().startOf('isoWeek');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [isRender, setIsRender] = useState(true);

  useEffect(() => {
    if (sampleJSON?.data?.roomsession.length && isRender) {
      const events = parseEventsData(
        sampleJSON.data.roomsession,
        firstDayOfWeek,
      );
      setEvents(events);
      setIsRender(false);
    }
  }, [firstDayOfWeek, isRender, sampleJSON]);

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
          onClose={handleOpenCloseModal}
          event={activeEvent}
        />
      )}
      <h1 className="calendar-heading">Time Table</h1>
      <WeekCalendar
        numberOfDays={5}
        firstDay={firstDayOfWeek}
        cellHeight={60}
        dayFormat="dddd"
        scaleUnit={60}
        eventSpacing={0}
        startTime={moment({h: 9, m: 0})}
        endTime={moment({h: 22, m: 0})}
        useModal={false}
        selectedIntervals={events}
        eventComponent={renderEventComponent}
        onEventClick={handleEventClick}
      />
    </>
  );
}

Calendar.propTypes = {};

export default Calendar;
