import React, { useReducer, useEffect } from 'react';

import TodoContext from './todo-context';

const defaultReducer = {
	todoItems: [],
};

const todoReducer = (state, action) => {
	if (action.type === 'LOAD') {
		// load items form local storage
		const items = JSON.parse(action.todoItems);
		if (!items) {
			return { todoItems: [] };
		}
		return { todoItems: items };
	}

	if (action.type === 'ADD') {
		//create new item and update
		const updatedTodoItems = [action.newTodoItem, ...state.todoItems];
		localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));

		return {
			todoItems: updatedTodoItems,
		};
	}

	if (action.type === 'DEL') {
		// find item and delete(filter is not this id)
		const updatedTodoItems = state.todoItems.filter(
			item => item.id !== action.id
		);

		localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
		return { ...state, todoItems: updatedTodoItems };
	}

	if (action.type === 'UPDATE') {
		// select item
		const existingTodoItemIndex = state.todoItems.findIndex(
			item => item.id === action.updatedTodoItem.id
		);
		const existingTodoItem = state.todoItems[existingTodoItemIndex];

		// create item
		const updatedTodoItem = {
			...existingTodoItem,
			todo: action.updatedTodoItem.todo,
			date: action.updatedTodoItem.date,
		};

		// immutable variable and create update items
		const updatedTodoItems = [...state.todoItems];
		updatedTodoItems[existingTodoItemIndex] = updatedTodoItem;

		localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
		return { todoItems: updatedTodoItems };
	}

	return defaultReducer;
};

const TodoProvider = props => {
	const [todoState, dispatchTodoAction] = useReducer(
		todoReducer,
		defaultReducer
	);

	useEffect(() => {
		// first load, fetch local storage items and set into reducer items
		const todoItems = localStorage.getItem('todoItems');
		dispatchTodoAction({ type: 'LOAD', todoItems });
	}, []);

	const addItemHandler = (todo, date) => {
		// check if date is empty
		const newDate = !date ? '' : new Date(date);
		const newTodoItem = {
			todo: todo,
			date: newDate,
			id: Math.random().toString(),
		};
		dispatchTodoAction({ type: 'ADD', newTodoItem });
	};

	const updateItemHandler = (todo, date, id) => {
		// check if date is empty
		const updatedDate = !date ? '' : new Date(date);
		const updatedTodoItem = {
			todo: todo,
			date: updatedDate,
			id: id,
		};
		dispatchTodoAction({ type: 'UPDATE', updatedTodoItem });
	};

	const deleteItemHandler = id => {
		dispatchTodoAction({ type: 'DEL', id });
	};

	const todoContext = {
		todoState: todoState,
		addItem: addItemHandler,
		updateItem: updateItemHandler,
		deleteItem: deleteItemHandler,
	};

	return (
		<TodoContext.Provider value={todoContext}>
			{props.children}
		</TodoContext.Provider>
	);
};

export default TodoProvider;
