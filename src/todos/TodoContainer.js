import cn from 'classnames';

const TodoContainer = ({ children, className }) => {
    const todoContainerClassName = cn('todo-container', className);
    return <div className={todoContainerClassName}>{children}</div>;
};

export default TodoContainer;
