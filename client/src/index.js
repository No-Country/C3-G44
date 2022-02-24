import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import Axios from 'axios'
import reportWebVitals from './reportWebVitals';

Axios.defaults.baseURL = 'http://localhost:4000/';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
