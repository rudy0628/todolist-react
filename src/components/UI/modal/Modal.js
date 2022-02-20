import classes from './Modal.module.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = props => {
	return <div className={classes.backdrop} onClick={props.onMessage} />;
};

const ModalOverlay = props => {
	const { title } = props;

	let titleClasses;
	if (title === 'Success') {
		titleClasses = `${classes.title} ${classes.success}`;
	}
	if (title === 'Error') {
		titleClasses = `${classes.title} ${classes.error}`;
	}

	return (
		<Card className={classes.modal}>
			<header className={titleClasses}>
				<h2>{props.title}</h2>
			</header>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<footer className={classes.actions}>
				<Button onClick={props.onMessage} className={classes.btn}>
					OK
				</Button>
			</footer>
		</Card>
	);
};

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onMessage={props.onMessage} />,
				document.querySelector('#backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					message={props.message}
					onMessage={props.onMessage}
				/>,
				document.querySelector('#overlay-root')
			)}
		</Fragment>
	);
};

export default Modal;
