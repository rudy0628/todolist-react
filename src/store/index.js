import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todo-slice';
import authSlice from './auth-slice';
import modalSlice from './modal-slice';

const store = configureStore({
	reducer: {
		todo: todoSlice.reducer,
		auth: authSlice.reducer,
		modal: modalSlice.reducer,
	},
});

export default store;
