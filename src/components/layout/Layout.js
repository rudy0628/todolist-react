import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { modalActions } from '../../store/modal-slice';
import Modal from '../UI/modal/Modal';
import MainHeader from './MainHeader';
import classes from './Layout.module.css';

const Layout = props => {
	const dispatch = useDispatch();

	//using modal in wide component
	const modalIsShow = useSelector(state => state.modal.isShow);
	const title = useSelector(state => state.modal.title);
	const message = useSelector(state => state.modal.message);

	const messageHandler = () => {
		dispatch(modalActions.clearModal());
	};

	return (
		<Fragment>
			{modalIsShow && (
				<Modal title={title} message={message} onMessage={messageHandler} />
			)}
			<MainHeader />
			<main className={classes.main}>{props.children}</main>
		</Fragment>
	);
};

export default Layout;
