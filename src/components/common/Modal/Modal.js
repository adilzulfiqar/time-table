import React from 'react';
import moment from 'moment';
import Modal from 'react-animated-modal';
import './styles.css';

export default function ReactModal({isOpen, onClose, event}) {
  console.log('......event', event);
  return (
    <Modal visible={isOpen} closemodal={onClose} type="zoomIn">
      <div className="event-modal-container">
        <div style={{backgroundColor: event.bgColor}}>
          <span className="event-modal-time">
            {moment(event.start).format('HH:mm')} -{' '}
            {moment(event.end).format('HH:mm')}
          </span>
          <br />
          <span className="event-modal-value">{event.value}</span>
        </div>
        <div>Were are working here. Sample Paragraph</div>
      </div>
    </Modal>
  );
}
