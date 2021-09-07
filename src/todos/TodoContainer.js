import cn from 'classnames';
import React from 'react';

const TodoContainer = React.forwardRef(
    ({ children, className, dragging }, ref) => {
        const todoContainerClassName = cn('todo-container', className);
        const opacity = dragging ? 0.5 : 1;
        return (
            <div
                ref={ref}
                style={{ opacity }}
                className={todoContainerClassName}
            >
                {children}
            </div>
        );
    }
);

export default TodoContainer;
