import { createSlice } from '@reduxjs/toolkit';

const todoInitialState = {
	todoItems: [],
};

const todoSlice = createSlice({
	name: 'todo',
	initialState: todoInitialState,
	reducers: {
		replaceItems(state) {
			const todoItems = localStorage.getItem('todoItems');
			state.todoItems = JSON.parse(todoItems);
		},
		addItem(state, action) {
			const newTodoItem = {
				todo: action.payload.todo,
				date: action.payload.date || '',
				id: Math.random().toString(),
			};
			state.todoItems.push(newTodoItem);

			//add to local storage
			localStorage.setItem('todoItems', JSON.stringify(state.todoItems));
		},
		updateItem(state, action) {
			// check if date is empty
			const existingTodoItem = state.todoItems.find(
				item => item.id === action.payload.id
			);
			existingTodoItem.todo = action.payload.todo;
			existingTodoItem.date = action.payload.date || '';

			//update to local storage
			localStorage.setItem('todoItems', JSON.stringify(state.todoItems));
		},
		removeItem(state, action) {
			const updatedTodoItems = state.todoItems.filter(
				item => item.id !== action.payload.id
			);

			state.todoItems = updatedTodoItems;
			//update to local storage
			localStorage.setItem('todoItems', JSON.stringify(state.todoItems));
		},
	},
});

export default todoSlice;
export const todoActions = todoSlice.actions;
