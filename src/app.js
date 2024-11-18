import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import 'zmp-ui/zaui.css'; 
import './css/app.css';
import App from './components/app';
import appConfig from '../app-config.json';
import { getAccessToken } from 'zmp-sdk/apis'; // Import getAccessToken from zmp-sdk/apis

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(App));

