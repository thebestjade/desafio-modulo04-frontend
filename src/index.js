import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);
