import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initialize } from './api';

window.api.receive('awsConfiguration', (configuration) => {
    initialize(configuration);

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
});

window.api.send('loadAwsConfiguration');
