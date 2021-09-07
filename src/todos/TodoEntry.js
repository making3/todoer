import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import TodoContainer from './TodoContainer';
import TodoEditEntry from './TodoEditEntry';
import TodoViewEntry from './TodoViewEntry';
import useDraggableTodo from './useDraggableTodo';
import TodoState from './TodoState';

const TodoEntry = ({ onSave, todoItem }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleViewToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (newText) => {
        onSave(todoItem.id, newText);
        handleViewToggle();
    };

    const [handlerRef, previewRef, isDragging, handlerId] =
        useDraggableTodo(todoItem);

    return (
        <TodoContainer
            className="todo-entry"
            dragging={isDragging}
            ref={previewRef}
        >
            {todoItem.state !== TodoState.Completed && (
                <div
                    ref={handlerRef}
                    data-handler-id={handlerId}
                    className="todo-button todo-button-move"
                >
                    <FontAwesomeIcon icon={faGripLines} />
                </div>
            )}
            {isEditing ? (
                <TodoEditEntry
                    onCancel={handleViewToggle}
                    onSave={handleSave}
                    text={todoItem.text}
                />
            ) : (
                <TodoViewEntry
                    index={todoItem.index}
                    onEdit={handleViewToggle}
                    todoItem={todoItem}
                />
            )}
        </TodoContainer>
    );
};

export default TodoEntry;
