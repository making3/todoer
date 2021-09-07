import * as api from './api';

const TODO_LOCAL_STORAGE_NAME = 'todoers';

export async function fetchPersistedTodoList() {
    const persistedList = await api.fetchPersistedTodoList();
    return JSON.parse(persistedList) || [];
}

export async function fetchLocalTodoList() {
    const rawTodoString = localStorage.getItem(TODO_LOCAL_STORAGE_NAME);

    if (rawTodoString) {
        return JSON.parse(rawTodoString);
    }

    return [];
}

export async function saveTodoList(todoList) {
    const filteredTodos = todoList.filter((t) => !!t && Object.keys(t).length);
    const rawTodoString = JSON.stringify(filteredTodos);

    localStorage.setItem(TODO_LOCAL_STORAGE_NAME, rawTodoString);
    await api.saveTodoList(rawTodoString);
}
