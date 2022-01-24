import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import useInput from '../../hooks/use-input';
import { todoActions } from '../../store/todo-slice';

import classes from './UpdateTodoItemForm.module.css';

const isEmpty = value => value.trim() !== '';

const UpdateTodoItemForm = props => {
	const todoRef = useRef();
	const dispatch = useDispatch();
	const todoItems = useSelector(state => state.todo.todoItems);

	// find current item
	const existItemIndex = todoItems.findIndex(item => item.id === props.id);
	const existItem = todoItems[existItemIndex];

	const todoDefaultValue = `${existItem.todo}`;
	// yyyy-mm-dd
	const dateDefaultValue = `${new Date(existItem.date)
		.toISOString()
		.slice(0, 10)}`;

	const {
		value: todoValue,
		isValid: todoIsValid,
		hasError: todoHasError,
		inputChangeHandler: todoInputChangeHandler,
		inputBlurHandler: todoInputBlurHandler,
	} = useInput(isEmpty, todoDefaultValue);

	const {
		value: dateValue,
		isValid: dateIsValid,
		hasError: dateHasError,
		inputChangeHandler: dateInputChangeHandler,
		inputBlurHandler: dateInputBlurHandler,
	} = useInput(isEmpty, dateDefaultValue);

	const formIsValid = todoIsValid && dateIsValid;

	// first load, todo input focus
	useEffect(() => {
		todoRef.current.focus();
	}, []);

	const submitHandler = e => {
		e.preventDefault();

		if (!formIsValid) return;

		dispatch(
			todoActions.updateItem({
				id: props.id,
				todo: todoValue,
				date: dateValue,
			})
		);
		// hide form
		props.onHideForm();
	};

	return (
		<form onSubmit={submitHandler} className={classes['update-form']}>
			<Input
				input={{ type: 'text', id: 'todo' }}
				label="Todo"
				ref={todoRef}
				value={todoValue}
				onChange={todoInputChangeHandler}
				onBlur={todoInputBlurHandler}
				isError={todoHasError}
			/>
			<Input
				input={{ type: 'date', id: 'date' }}
				label="Date"
				value={dateValue}
				onChange={dateInputChangeHandler}
				onBlur={dateInputBlurHandler}
				isError={dateHasError}
			/>
			<Button className={classes['update-form__btn']} disabled={!formIsValid}>
				UPDATE
			</Button>
		</form>
	);
};

export default UpdateTodoItemForm;
