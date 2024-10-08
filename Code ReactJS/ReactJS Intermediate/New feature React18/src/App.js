import './App.css';
import Form from './Form';
import React, { useState } from "react";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [value, onChange] = useState(new Date());
  
  return (
    <div>
      <br/>
      <Calendar onChange={onChange} value={value} />
      <br/>
      <Form/>
      <br/>
    </div>
  );
}

export default App;
