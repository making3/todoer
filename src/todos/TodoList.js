import { useReducer, useRef } from 'react';
import TodoAdd from './TodoAdd';
import TodoItemsList from './TodoItemsList';
import TodoSection from './TodoSection';
import TodoState from './TodoState';

const reducer = (oldTodos, action) => {
    const todos = oldTodos.slice();

    switch (action.type) {
        case 'add':
            return [
                ...todos,
                {
                    id: Math.random().toString(16).slice(2),
                    state: TodoState.Active,
                    text: action.text,
                },
            ];
        case 'togglePause':
            const index = todos.findIndex(({ id }) => id === action.id);
            todos[index] = {
                ...todos[index],
                state:
                    todos[index].state === TodoState.Active
                        ? TodoState.Paused
                        : TodoState.Active,
            };
            return todos;
        case 'save':
            const todoToUpdate = todos.find(({ id }) => id === action.id);
            todoToUpdate.text = action.text;
            return todos;
        case 'remove':
            const indexOfTodo = todos.findIndex(({ id }) => id === action.id);
            todos.splice(indexOfTodo, 1);
            return todos;
        case 'complete':
            const cindex = todos.findIndex(({ id }) => id === action.id);
            todos[cindex] = {
                ...todos[cindex],
                state: TodoState.Completed,
            };
            return todos;
        default:
            throw new Error();
    }
};

const TodoList = () => {
    const todoAddRef = useRef(null);
    const [todos, dispatch] = useReducer(reducer, []);

    const handleAddEntry = (newTodoText) => {
        dispatch({ type: 'add', text: newTodoText });
    };

    const handleSave = (id, newText) => {
        dispatch({ type: 'save', id, text: newText });
        todoAddRef.current.focus();
    };

    const handleTogglePause = (id) => {
        dispatch({ type: 'togglePause', id });
    };
    const handleRemove = (id) => {
        dispatch({ type: 'remove', id });
    };

    const handleComplete = (id) => {
        dispatch({ type: 'complete', id });
    };

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
