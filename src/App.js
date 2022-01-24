import React, { useEffect } from 'react';
import TodoForm from './components/newTodo/TodoForm';
import Todo from './components/todo/Todo';
import { useDispatch } from 'react-redux';
import { todoActions } from './store/todo-slice';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(todoActions.replaceItems());
	}, [dispatch]);

	return (
		<React.Fragment>
			<TodoForm />
			<Todo />
		</React.Fragment>
	);
}

export default App;
