import { Fragment, useState } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Spinner from '../UI/spinner/Spinner';
import useInput from '../../hooks/use-input';

import { useDispatch } from 'react-redux';
import { todoActions } from '../../store/todo-slice';
import { modalActions } from '../../store/modal-slice';

import classes from './TodoForm.module.css';

const isEmpty = value => value.trim() !== '';

const TodoForm = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	// using custom hook to validate and lister input
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

	const formIsValid = todoIsValid && dateIsValid;

	const addItemHandler = e => {
		e.preventDefault();

		if (!formIsValid) {
			// error, show modal
			dispatch(
				modalActions.addModal({
					title: 'Error',
					message: 'Upload Todo Item Failed!',
				})
			);
			return;
		}

		setIsLoading(true);
		dispatch(
			todoActions.addItem({
				todo: todoValue,
				date: dateValue,
			})
		);
		setIsLoading(false);

		// success, show modal
		dispatch(
			modalActions.addModal({
				title: 'Success',
				message: 'Upload Todo Item Success!',
			})
		);

		// submit, input set empty
		todoReset();
		dateReset();
	};

	return (
		<Fragment>
			<Card className={classes['todo-form']}>
				{isLoading && <Spinner />}
				{!isLoading && (
					<form onSubmit={addItemHandler}>
						<Input
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
								className={classes['todo-form__btn']}
								disabled={!formIsValid}
							>
								ADD
							</Button>
						</div>
					</form>
				)}
			</Card>
		</Fragment>
	);
};

export default TodoForm;
