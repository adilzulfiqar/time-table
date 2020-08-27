import React from 'react';
import ScheduleCalendar from './components/ScheduleCalendar';
import EventCalendar from './components/EventCalendar';
import './App.css';

import {sampleJSONForStudent, sampleJSONForTeacher} from './temp/sampleJSON';
import {eventsSample} from './temp/events';

export default function App() {
  return (
    <>
      <EventCalendar eventList={eventsSample} />
      {/* <ScheduleCalendar sampleJSON={sampleJSONForStudent} />; */}
    </>
  );
}
