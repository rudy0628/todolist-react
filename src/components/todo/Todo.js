import React from 'react';

import Card from '../UI/Card/Card';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';

import classes from './Todo.module.css';

const Todo = () => {
	// const todoCtx = useContext(TodoContext);
	const storeItems = useSelector(state => state.todo.todoItems);
	console.log(storeItems);

	// use todoItems to create components list
	const todoItems = storeItems.map(item => (
		<TodoItem
			year={new Date(item.date).getFullYear().toString()}
			month={new Date(item.date).toLocaleString('en-US', { month: 'long' })}
			day={new Date(item.date).getDate().toString()}
			title={item.todo}
			date={item.date}
			key={item.id}
			id={item.id}
		/>
	));

	return (
		<Card className={classes.todo}>
			{!storeItems.length && (
				<p className={classes['todo__empty--text']}>No any todo item</p>
			)}
			<ul className={classes.todo__list}>{todoItems}</ul>
		</Card>
	);
};

export default Todo;
