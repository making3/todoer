import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { saveTodoList } from './storage';
import TodoList from './todos';
import { selectTodos } from './todos/todosSlice';
import './styles/app.scss';

function usePersistedTodoList() {
    const todos = useSelector(selectTodos);

    useEffect(() => {
        // TODO: Only save after X time - AKA don't save constantly
        saveTodoList(todos).catch((error) => {
            // TODO: Visually display this error
            console.log('Saving error ', error);
        });
    }, [todos]);
}

function App() {
    usePersistedTodoList();
    return (
        <DndProvider backend={HTML5Backend}>
            <TodoList />
        </DndProvider>
    );
}

export default App;
