import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './app.css';

console.log(process.env.REACT_APP_BACK_END_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);

