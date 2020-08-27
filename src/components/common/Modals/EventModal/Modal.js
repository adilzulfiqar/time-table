import React from 'react';
import moment from 'moment';
import Modal from 'react-animated-modal';
import './styles.css';

export default function ReactModal({
  isOpen,
  onClose,
  event,
  windowSize,
  windowBreakPoint,
}) {
  console.log('......event', event);
  return (
    <Modal
      visible={isOpen}
      closemodal={onClose}
      type={windowSize.width > windowBreakPoint ? 'zoomIn' : 'fadeInRight'}>
      <div className="event-modal-container">
        <div style={{backgroundColor: '#587F93'}}>
          <span className="event-modal-time">
            {moment(event.start).format('HH:mm')} -{' '}
            {moment(event.end).format('HH:mm')}
          </span>
          <br />
          <span className="event-modal-value">
            {event.event.classroom_teacher_matter.matter.name}
          </span>
          <br />
          <span className="event-modal-value">{event.event.element.name}</span>
          <br />
          <br />
        </div>
        <div className="event-details">{event.event.description}</div>
      </div>
    </Modal>
  );
}
