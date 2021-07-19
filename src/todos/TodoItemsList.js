import TodoEntry from './TodoEntry';

const TodoItemsList = ({
    onComplete,
    onRemove,
    onSave,
    onTogglePause,
    state: expectedState,
    todos,
}) =>
    todos
        .filter(({ state }) => state === expectedState)
        .map((todo) => (
            <TodoEntry
                key={todo.id}
                onComplete={onComplete}
                onRemove={onRemove}
                onSave={onSave}
                onTogglePause={onTogglePause}
                todoItem={todo}
            />
        ));

export default TodoItemsList;
