import React from 'react';
import moment from 'moment';
import Modal from 'react-animated-modal';
import {userTypes} from '../../../ScheduleCalendar/constants';
import './styles.css';

export default function ReactModal({
  isOpen,
  onClose,
  event,
  type,
  windowSize,
  windowBreakPoint,
}) {
  return (
    <Modal
      visible={isOpen}
      closemodal={onClose}
      type={windowSize.width > windowBreakPoint ? 'zoomIn' : 'fadeInRight'}>
      <div className="event-modal-container">
        <div style={{backgroundColor: event.bgColor}}>
          <span className="event-modal-time">
            {moment(event.start).format('HH:mm')} -{' '}
            {moment(event.end).format('HH:mm')}
          </span>
          <br />
          <span className="event-modal-value">{event.matterName}</span>
          <br />
          <span className="event-modal-value">{event.elementName}</span>
          <br />
          <br />
        </div>
        <div className="event-details">
          <h2>School Year: {event.schoolYear}</h2>
          <h2>Day: {event.day}</h2>
          {type === userTypes.student && (
            <h2>Teacher Name: {event.teacherName}</h2>
          )}
          {type === userTypes.teacher && (
            <h2>Classroom: {event.classroomName}</h2>
          )}
          {type === userTypes.teacher && <h2>Matter: {event.matterName}</h2>}
          {type === userTypes.teacher && <h2>Element: {event.elementName}</h2>}
        </div>
      </div>
    </Modal>
  );
}
