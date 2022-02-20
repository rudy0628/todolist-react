import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
	const containerClasses = props.isError
		? `${classes.invalid} ${classes.input}`
		: `${classes.input}`;

	return (
		<div className={containerClasses}>
			<label htmlFor={props.input.id}>{props.label}</label>
			<input
				{...props.input}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				ref={ref}
			/>
			{props.isError && <p className={classes['error-text']}>Invalid Input!</p>}
		</div>
	);
});

export default Input;
