import { useRef } from 'react';
import { useSelector } from 'react-redux';
import TodoAdd from './TodoAdd';
import TodoItemsList from './TodoItemsList';
import TodoSection from './TodoSection';
import { add, save, selectTodos } from './todosSlice';
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

    if (!todos) {
        return 'loading';
    }

    return (
        <div className="todo-list">
            <TodoAdd onAdd={handleAddEntry} ref={todoAddRef} />
            <div className="todo-current-list">
                <TodoItemsList
                    onSave={handleSave}
                    todos={todos}
                    state={TodoState.Active}
                />
            </div>

            <TodoSection title="Do Later">
                <TodoItemsList
                    onSave={handleSave}
                    todos={todos}
                    state={TodoState.Paused}
                />
            </TodoSection>

            <TodoSection title="Done">
                <TodoItemsList todos={todos} state={TodoState.Completed} />
            </TodoSection>
        </div>
    );
};

export default TodoList;
