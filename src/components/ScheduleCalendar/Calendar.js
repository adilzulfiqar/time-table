import React, {useState, useEffect} from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import {LightenDarkenColor} from 'lighten-darken-color';
import 'react-week-calendar/dist/style.css';
import MobileCalendar from './MobileCalendar';
import Modal from '../common/Modals/ScheduleModal';
import {useWindowSize} from '../../utils/hooks/useWindowSize';
import {getRandomColor} from '../../utils/utils';
import {colors} from '../../temp/sampleJSON';
import {windowBreakPoint, weekDays, userTypes, cellHeight} from './constants';
import './styles.css';

const renderEventComponent = (event) => {
  const overMinutesInEvent = (moment(event.start).format('mm') * 90) / 60;
  const eventCardHeight = (moment(event.start).diff(event.end, 'm') * 90) / 60;

  return (
    <div
      className="event"
      style={{
        background: event.bgColor,
        borderBottom: `4px solid ${LightenDarkenColor(event.bgColor, -50)}`,
        marginTop: Number(overMinutesInEvent),
        height: Math.abs(eventCardHeight),
      }}>
      <span className="event-time">
        {moment(event.start).format('HH:mm')} -{' '}
        {moment(event.end).format('HH:mm')}
      </span>
      <br />
      <span className="event-value">{event.matterName}</span>
      <br />
      <span className="event-value">{event.elementName}</span>
    </div>
  );
};

export const parseEvent = (event, firstDayOfWeek) => {
  let startDate = moment(firstDayOfWeek)
    .add(event.day, 'day')
    .format('YYYY-MM-DD');
  let start_time = moment(firstDayOfWeek)
    .add(event.day, 'day')
    .format('YYYY-MM-DD');

  const start = moment(`${startDate} ${event.start_time}`);
  const end = moment(`${start_time} ${event.end_time}`);

  return {
    start,
    end,
    matterName: event.classroom_teacher_matter.matter.name,
    elementName: event.element.name,
    classroomName: event.classroom_teacher_matter.classroom.name,
    bgColor: getRandomColor(colors),
    schoolYear: event.school_year.name,
    day: weekDays[event.day],
    teacherName: `${event.classroom_teacher_matter.teacher.user.first_name} ${event.classroom_teacher_matter.teacher.user.last_name}`,
  };
};

const parseEventsData = (events, firstDayOfWeek) => {
  return events.map((event) => {
    return parseEvent(event, firstDayOfWeek);
  });
};

function Calendar({sampleJSON}) {
  const firstDayOfWeek = moment().startOf('isoWeek');
  const windowSize = useWindowSize();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(null);
  const [isRender, setIsRender] = useState(true);
  const [endPointsForCalendar, setEndPoints] = useState({start: 9, end: 21});

  useEffect(() => {
    let endPoints = {
      start: 0,
      end: 0,
    };

    if (
      sampleJSON &&
      sampleJSON.data &&
      sampleJSON.data.roomsession &&
      sampleJSON.data.roomsession.length &&
      isRender
    ) {
      const events = parseEventsData(
        sampleJSON.data.roomsession,
        firstDayOfWeek,
      );

      endPoints.start = events.reduce((min, event) => {
        const hour = moment(event.start).format('HH');

        return hour < min ? hour : min;
      }, moment(events[0].start).format('HH'));

      endPoints.end = events.reduce((max, event) => {
        const hour = moment(event.end).format('HH');

        return max < hour ? hour : max;
      }, moment(events[0].end).format('HH'));

      endPoints.start && endPoints.end && setEndPoints(endPoints);
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
          windowSize={windowSize}
          onClose={handleOpenCloseModal}
          windowBreakPoint={windowBreakPoint}
          event={activeEvent}
          type={sampleJSON && sampleJSON.data && sampleJSON.data.type}
        />
      )}
      <h1 className="calendar-heading">Time Table</h1>
      <div className="title-bar">
        <h1>
          {sampleJSON &&
          sampleJSON.data &&
          sampleJSON.data.type === userTypes.student
            ? sampleJSON.data.roomsession[0].classroom_teacher_matter.classroom
                .name
            : sampleJSON &&
              sampleJSON.data &&
              sampleJSON.data.type === userTypes.teacher &&
              `${sampleJSON.data.roomsession[0].classroom_teacher_matter.teacher.user.first_name} ${sampleJSON.data.roomsession[0].classroom_teacher_matter.teacher.user.last_name}`}
        </h1>
        <h1>
          {sampleJSON &&
            sampleJSON.data &&
            sampleJSON.data.roomsession[0].school_year.name}
        </h1>
      </div>
      {windowSize.width > windowBreakPoint ? (
        <WeekCalendar
          numberOfDays={7}
          firstDay={firstDayOfWeek}
          cellHeight={cellHeight}
          dayFormat="dddd"
          scaleUnit={60}
          eventSpacing={0}
          startTime={moment({h: endPointsForCalendar.start, m: 0})}
          endTime={moment({h: Number(endPointsForCalendar.end) + 2, m: 0})}
          useModal={false}
          selectedIntervals={events}
          eventComponent={renderEventComponent}
          onEventClick={handleEventClick}
        />
      ) : (
        <MobileCalendar
          data={sampleJSON}
          handleEventClick={handleEventClick}
          firstDayOfWeek={firstDayOfWeek}
        />
      )}
    </>
  );
}

Calendar.propTypes = {};

export default Calendar;
