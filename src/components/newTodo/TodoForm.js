import React, { useRef, useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import useInput from '../../hooks/use-input';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../store/todo-slice';

import classes from './TodoForm.module.css';

const isEmpty = value => value.trim() !== '';

const TodoForm = () => {
	const [formIsShow, setFormIsShow] = useState(false);
	const dispatch = useDispatch();

	const {
		value: todoValue,
		isValid: todoIsValid,
		hasError: todoHasError,
		inputChangeHandler: todoInputChangeHandler,
		inputBlurHandler: todoInputBlurHandler,
		reset: todoReset,
	} = useInput(isEmpty);

	const {
		value: dateValue,
		isValid: dateIsValid,
		hasError: dateHasError,
		inputChangeHandler: dateInputChangeHandler,
		inputBlurHandler: dateInputBlurHandler,
		reset: dateReset,
	} = useInput(isEmpty);

	const todoRef = useRef();

	const formIsValid = todoIsValid && dateIsValid;

	useEffect(() => {
		if (formIsShow) {
			todoRef.current.focus();
		}
	}, [formIsShow]);

	const addItemHandler = e => {
		e.preventDefault();

		if (!formIsValid) return;

		dispatch(
			todoActions.addItem({
				todo: todoValue,
				date: dateValue,
			})
		);

		// submit, input set empty
		todoReset();
		dateReset();

		hideFormHandler();
	};

	const showFormHandler = () => {
		setFormIsShow(true);
	};

	const hideFormHandler = () => {
		setFormIsShow(false);

		// cancel, input set empty
		todoReset();
		dateReset();
	};

	return (
		<Card className={classes['todo-form']}>
			{!formIsShow && (
				<Button
					className={classes['todo-form__btn--open']}
					onClick={showFormHandler}
				>
					Open
				</Button>
			)}
			{formIsShow && (
				<form onSubmit={addItemHandler}>
					<Input
						ref={todoRef}
						input={{ type: 'text', id: 'todo' }}
						label="Todo"
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
					<div className={classes['todo-form__btn-group']}>
						<Button
							onClick={hideFormHandler}
							className={classes['todo-form__btn']}
						>
							Cancel
						</Button>
						<Button
							className={classes['todo-form__btn']}
							disabled={!formIsValid}
						>
							ADD
						</Button>
					</div>
				</form>
			)}
		</Card>
	);
};

export default TodoForm;
