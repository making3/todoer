import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './todos/todosSlice';

let store;

export function initializeStore(initialTodos) {
    store = configureStore({
        reducer: todosSlice,
        preloadedState: {
            todos: initialTodos,
        },
    });
    return store;
}

export function getStore() {
    return store;
}
