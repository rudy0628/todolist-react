import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../../store/todo-slice';
import { modalActions } from '../../store/modal-slice';

import UpdateTodoItemForm from './UpdateTodoItemFom';

import classes from './TodoItem.module.css';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const TodoItem = props => {
	const dispatch = useDispatch();

	const [updateFormIsShow, setUpdateFormIsShow] = useState(false);

	const showFormHandler = () => {
		setUpdateFormIsShow(true);
	};

	const hideFormHandler = () => {
		setUpdateFormIsShow(false);
	};

	const deleteItemHandler = () => {
		dispatch(
			todoActions.removeItem({
				id: props.id,
			})
		);

		dispatch(
			modalActions.addModal({
				title: 'Success',
				message: 'Deleted Todo Item Success!',
			})
		);
	};

	return (
		<li className={classes.todo__item}>
			{updateFormIsShow && (
				<UpdateTodoItemForm
					id={props.id}
					onHideForm={hideFormHandler}
					todo={props.title}
					date={props.date}
				/>
			)}
			{!updateFormIsShow && (
				<div className={classes.todo__date}>
					<span>{props.year}</span>
					<span>{props.month}</span>
					<span className={classes['todo__date--day']}>{props.day}</span>
				</div>
			)}
			{!updateFormIsShow && (
				<p className={classes.todo__title}>{props.title}</p>
			)}
			<div className={classes['todo__button-group']}>
				{!updateFormIsShow && (
					<button onClick={showFormHandler}>
						<FaEdit className={classes.todo__icon} />
					</button>
				)}
				{updateFormIsShow && (
					<button onClick={hideFormHandler}>
						<FaEdit className={classes.todo__icon} />
					</button>
				)}
				<button onClick={deleteItemHandler}>
					<FaTrashAlt className={classes.todo__icon} />
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
