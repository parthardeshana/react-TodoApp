import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {API_DATA} from './apiData';

ReactDOM.render(
  <React.StrictMode>
    <App data={API_DATA}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
