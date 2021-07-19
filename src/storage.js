import * as api from './api';

const TODO_STORAGE_NAME = 'todoers';

export async function fetchPersistedTodoList() {
    const persistedList = await api.fetchPersistedTodoList();
    return JSON.parse(persistedList) || [];
}

export async function fetchLocalTodoList() {
    const todoers = localStorage.getItem(TODO_STORAGE_NAME);

    if (todoers) {
        return JSON.parse(todoers);
    }

    return [];
}

export async function saveTodoList(todoList) {
    const rawTodoString = JSON.stringify(todoList);

    localStorage.setItem(TODO_STORAGE_NAME, rawTodoString);
    api.saveTodoList(rawTodoString);
}
