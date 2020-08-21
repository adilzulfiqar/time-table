import React from 'react';
import Calendar from './components/Calendar';
import './App.css';

import {sampleJSON} from './temp/sampleJSON';

export default function App() {
  return <Calendar sampleJSON={sampleJSON} />;
}
