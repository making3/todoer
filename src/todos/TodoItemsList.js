import TodoEntry from './TodoEntry';

const TodoItemsList = ({ onSave, state: expectedState, todos }) =>
    todos
        .map((todo, index) => ({ ...todo, index }))
        .filter(({ state }) => state === expectedState)
        .map((todo) => (
            <TodoEntry key={todo.id} onSave={onSave} todoItem={todo} />
        ));

export default TodoItemsList;
