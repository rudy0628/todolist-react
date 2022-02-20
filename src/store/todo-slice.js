import { createSlice } from '@reduxjs/toolkit';

const todoInitialState = {
	todoItems: [],
};

const todoSlice = createSlice({
	name: 'todo',
	initialState: todoInitialState,
	reducers: {
		replaceItems(state, action) {
			state.todoItems = action.payload || [];
		},
		addItem(state, action) {
			const newTodoItem = {
				todo: action.payload.todo,
				date: action.payload.date || '',
				id: Math.random().toString(),
			};

			state.todoItems.push(newTodoItem);
		},
		updateItem(state, action) {
			const existingTodoItem = state.todoItems.find(
				item => item.id === action.payload.id
			);

			existingTodoItem.todo = action.payload.todo;
			existingTodoItem.date = action.payload.date || '';
		},
		removeItem(state, action) {
			const updatedTodoItems = state.todoItems.filter(
				item => item.id !== action.payload.id
			);

			state.todoItems = updatedTodoItems;
		},
	},
});

// update firebase data
export const sendData = (todoItems, id) => {
	return async () => {
		await fetch(
			`https://todolist-practice-bde99-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`,
			{
				method: 'PUT',
				body: JSON.stringify(todoItems),
			}
		);
	};
};

// get firebase data
export const getData = id => {
	return async dispatch => {
		const response = await fetch(
			`https://todolist-practice-bde99-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`
		);

		const data = await response.json();
		dispatch(todoActions.replaceItems(data));
	};
};

export default todoSlice;
export const todoActions = todoSlice.actions;
