import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { saveTodoList } from '../api';
import TodoAdd from './TodoAdd';
import TodoItemsList from './TodoItemsList';
import TodoSection from './TodoSection';
import {
    add,
    complete,
    remove,
    save,
    selectTodos,
    togglePause,
} from './todosSlice';
import TodoState from './TodoState';

const TodoList = () => {
    const todoAddRef = useRef(null);
    const todos = useSelector(selectTodos);

    const handleAddEntry = (newTodoText) => {
        add(newTodoText);
    };

    const handleSave = (id, newText) => {
        save(id, newText);
        todoAddRef.current.focus();
    };

    const handleTogglePause = (id) => {
        togglePause(id);
    };
    const handleRemove = (id) => {
        remove(id);
    };

    const handleComplete = (id) => {
        complete(id);
    };

    if (!todos) {
        return 'loading';
    }

    return (
        <div className="todo-list">
            <TodoAdd onAdd={handleAddEntry} ref={todoAddRef} />
            <div className="todo-current-list">
                <TodoItemsList
                    onComplete={handleComplete}
                    onRemove={handleRemove}
                    onSave={handleSave}
                    onTogglePause={handleTogglePause}
                    todos={todos}
                    state={TodoState.Active}
                />
            </div>

            <TodoSection title="Do Later">
                <TodoItemsList
                    onComplete={handleComplete}
                    onRemove={handleRemove}
                    onSave={handleSave}
                    onTogglePause={handleTogglePause}
                    todos={todos}
                    state={TodoState.Paused}
                />
            </TodoSection>

            <TodoSection title="Done">
                <TodoItemsList
                    onComplete={handleComplete}
                    onRemove={handleRemove}
                    onSave={handleSave}
                    onTogglePause={handleTogglePause}
                    todos={todos}
                    state={TodoState.Completed}
                />
            </TodoSection>
        </div>
    );
};

export default TodoList;
