import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { initializeStore } from './store';
import { initialize } from './api';
import { fetchPersistedTodoList, fetchLocalTodoList } from './storage';

window.api.receive('awsConfiguration', async (configuration) => {
    initialize(configuration);

    let todos;
    try {
        todos = await fetchPersistedTodoList();
    } catch (error) {
        console.log('Persisted fetch error ', error);
        todos = fetchLocalTodoList();
    }

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={initializeStore(todos)}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
});

window.api.send('loadAwsConfiguration');
