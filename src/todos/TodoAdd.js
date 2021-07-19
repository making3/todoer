import { forwardRef, useState } from 'react';
import cn from 'classnames';
import TodoContainer from './TodoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const TodoAdd = forwardRef(({ onAdd }, ref) => {
    const [text, setText] = useState('');

    const handleAddNewItem = () => {
        if (!text) {
            return;
        }

        setText('');
        onAdd(text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddNewItem();
        }
    };

    const addIconClassNames = cn('todo-button', 'todo-add-button', {
        'todo-add-button-disabled': !text,
    });

    return (
        <TodoContainer className="todo-add">
            <input
                className="todo-input"
                placeholder="Add an item"
                tabIndex={0}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={ref}
                value={text}
            />
            <FontAwesomeIcon
                className={addIconClassNames}
                icon={faPlusCircle}
                onClick={handleAddNewItem}
                disabled={!text}
            />
        </TodoContainer>
    );
});

export default TodoAdd;
