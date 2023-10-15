import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SettingsContext } from './context/settingsContext';
import './styles.scss';
import './styles/fontawesome/css/all.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SettingsContext>
    <App />
  </SettingsContext>
);
