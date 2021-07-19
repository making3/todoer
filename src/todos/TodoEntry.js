import TodoContainer from './TodoContainer';
import { useState } from 'react';
import TodoEditEntry from './TodoEditEntry';
import TodoViewEntry from './TodoViewEntry';

const TodoEntry = ({
    onComplete,
    onRemove,
    onSave,
    onTogglePause,
    todoItem,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleViewToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (newText) => {
        onSave(todoItem.id, newText);
        handleViewToggle();
    };

    return (
        <TodoContainer className="todo-entry">
            {isEditing ? (
                <TodoEditEntry
                    onCancel={handleViewToggle}
                    onSave={handleSave}
                    text={todoItem.text}
                />
            ) : (
                <TodoViewEntry
                    onComplete={onComplete}
                    onEdit={handleViewToggle}
                    onRemove={onRemove}
                    onTogglePause={onTogglePause}
                    todoItem={todoItem}
                />
            )}
        </TodoContainer>
    );
};

export default TodoEntry;
