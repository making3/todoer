import { createSlice } from '@reduxjs/toolkit';
import TodoState from './TodoState';
import { getStore } from '../store';

const todosSlice = createSlice({
    name: 'todos',
    reducers: {
        add: (state, { payload: text }) => {
            state.todos = [
                ...state.todos,
                {
                    id: Math.random().toString(16).slice(2),
                    state: TodoState.Active,
                    text,
                },
            ];
        },
        moveTodo: (state, { payload: { fromIndex, toIndex } }) => {
            const todoToMove = { ...state.todos[fromIndex] };

            const newTodos = [
                ...state.todos.slice(0, fromIndex).map((t) => ({ ...t })),
                ...state.todos.slice(fromIndex + 1).map((t) => ({ ...t })),
            ];
            newTodos.splice(toIndex, 0, todoToMove);
            return { ...state, todos: newTodos };
        },
        togglePause: (state, { payload: id }) => {
            const index = state.todos.findIndex((todo) => todo.id === id);
            state.todos[index] = {
                ...state.todos[index],
                state:
                    state.todos[index].state === TodoState.Active
                        ? TodoState.Paused
                        : TodoState.Active,
            };
        },
        save: (state, { payload: { id, text } }) => {
            const todoToUpdate = state.todos.find((todo) => todo.id === id);
            todoToUpdate.text = text;
        },
        remove: (state, { payload: id }) => {
            const indexOfTodo = state.todos.findIndex((todo) => todo.id === id);
            state.todos.splice(indexOfTodo, 1);
        },
        complete: (state, { payload: id }) => {
            const cindex = state.todos.findIndex((todo) => todo.id === id);
            state.todos[cindex] = {
                ...state.todos[cindex],
                state: TodoState.Completed,
            };
        },
    },
});

export function add(text) {
    getStore().dispatch(todosSlice.actions.add(text));
}

export function save(id, text) {
    getStore().dispatch(todosSlice.actions.save({ id, text }));
}

export function togglePause(id) {
    getStore().dispatch(todosSlice.actions.togglePause(id));
}

export function remove(id) {
    getStore().dispatch(todosSlice.actions.remove(id));
}

export function complete(id) {
    getStore().dispatch(todosSlice.actions.complete(id));
}

export function selectTodos(state) {
    return state.todos;
}

export function moveTodo(fromIndex, toIndex) {
    getStore().dispatch(todosSlice.actions.moveTodo({ fromIndex, toIndex }));
}

export default todosSlice.reducer;
