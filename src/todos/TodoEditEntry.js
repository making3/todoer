import { useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const TodoEditEntry = ({ onCancel, onSave, text: initialText }) => {
    const [text, setText] = useState(initialText);

    const handleSave = () => {
        if (!text) {
            return;
        }

        onSave(text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
    };

    const addIconClassNames = cn('todo-button', 'todo-add-button', {
        'todo-add-button-disabled': !text,
    });

    const focusInitialRef = (inputRef) => {
        if (inputRef) {
            inputRef.focus();
        }
    };

    return (
        <>
            <input
                ref={focusInitialRef}
                className="todo-input"
                tabIndex={0}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                value={text}
            />
            <FontAwesomeIcon
                className={addIconClassNames}
                icon={faCheck}
                onClick={handleSave}
            />
            <FontAwesomeIcon
                className={addIconClassNames}
                icon={faTimes}
                onClick={onCancel}
            />
        </>
    );
};

export default TodoEditEntry;
