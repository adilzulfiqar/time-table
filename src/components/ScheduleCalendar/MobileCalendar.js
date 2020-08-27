import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {LightenDarkenColor} from 'lighten-darken-color';
import {getRandomColor} from '../../utils/utils';
import {weekDays} from './constants';
import {colors} from '../../temp/sampleJSON';
import {parseEvent} from './Calendar';
import './mobileStyles.css';

export default function MobileCalendar({
  data,
  handleEventClick,
  firstDayOfWeek,
}) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let parsedEvents = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    data &&
      data.data &&
      data.data.roomsession.length &&
      data.data.roomsession.forEach((event) => {
        const day = weekDays[event.day];
        parsedEvents = {
          ...parsedEvents,
          [day]: [...parsedEvents[day], event],
        };
      });

    setEvents(parsedEvents);
  }, [data]);

  const onEventPress = (e) => () => {
    const parsedEvent = parseEvent(e, firstDayOfWeek);
    handleEventClick(parsedEvent);
  };

  return (
    <div className="mobile-view-calendar-container">
      {weekDays.map((dayName, index) => {
        return (
          <div className="mobile-view-day-section" key={index}>
            <h3 className="mobile-view-day-name">{dayName}</h3>
            <div className="mobile-view-events-container">
              {events && events[dayName] && events[dayName].length
                ? events[dayName].map((event, eventIndex) => {
                    const bgColor = getRandomColor(colors);
                    return (
                      <div
                        className="mobile-view-event"
                        key={eventIndex}
                        onClick={onEventPress(event)}
                        style={{
                          background: bgColor,
                          borderBottom: `4px solid ${LightenDarkenColor(
                            bgColor,
                            -50,
                          )}`,
                        }}>
                        <span className="mobile-view-event-time">
                          {moment(event.start_time, 'HH:mm:ss').format('HH:mm')}{' '}
                          - {moment(event.end_time, 'HH:mm:ss').format('HH:mm')}
                        </span>
                        <br />
                        <span className="mobile-view-event-value">
                          {event.classroom_teacher_matter.matter.name}
                        </span>
                        <br />
                        <span className="mobile-view-event-value">
                          {event.element.name}
                        </span>
                      </div>
                    );
                  })
                : 'no events'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
