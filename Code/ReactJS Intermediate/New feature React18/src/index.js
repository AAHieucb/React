import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Chỉnh tiền tố cho useId
const root = ReactDOM.createRoot(document.getElementById('root'), { identifierPrefix: "hieu" });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
