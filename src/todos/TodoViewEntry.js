import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import {
    faCheck,
    faPause,
    faPlay,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import TodoState from './TodoState';
import { complete, remove, togglePause } from './todosSlice';

const TodoViewEntry = ({ onEdit, todoItem }) => {
    const handleDoubleClick = (e) => {
        if (todoItem.state === TodoState.Completed) {
            return false;
        }
        onEdit();
    };
    const todoViewEntryClassName = cn('todo-entry-text', {
        'todo-entry-completed': todoItem.state === TodoState.Completed,
    });
    return (
        <>
            <div
                onDoubleClick={handleDoubleClick}
                className={todoViewEntryClassName}
            >
                {todoItem.text}
            </div>
            {todoItem.state !== TodoState.Completed && (
                <>
                    <FontAwesomeIcon
                        onClick={() => complete(todoItem.id)}
                        className="todo-button todo-button-check"
                        icon={faCheck}
                    />
                    <FontAwesomeIcon
                        onClick={() => togglePause(todoItem.id)}
                        className="todo-button todo-button-pause"
                        icon={
                            todoItem.state === TodoState.Paused
                                ? faPlay
                                : faPause
                        }
                    />
                    <FontAwesomeIcon
                        onClick={() => remove(todoItem.id)}
                        className="todo-button todo-button-remove"
                        icon={faTrash}
                    />
                </>
            )}
        </>
    );
};

export default TodoViewEntry;
