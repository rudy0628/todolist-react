import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import { NavLink, Link } from 'react-router-dom';

import { authAction } from '../../store/auth-slice';
import classes from './MainHeader.module.css';

const MainHeader = () => {
	const [navIsOpen, setNavIsOpen] = useState(false);
	const isLogged = useSelector(state => state.auth.isLogged);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(authAction.logout());
		setNavIsOpen(prevState => !prevState);
	};

	const toggleNavHandler = () => {
		setNavIsOpen(prevState => !prevState);
	};

	const headerClasses = navIsOpen
		? `${classes.header} ${classes['nav-open']}`
		: `${classes.header}`;

	return (
		<header className={headerClasses}>
			<div className={classes.banner}>
				<h1>TodoList</h1>
			</div>
			<button
				className={classes['nav__open-menu-btn']}
				onClick={toggleNavHandler}
			>
				{!navIsOpen && (
					<AiOutlineMenu className={classes['nav__open-menu-icon']} />
				)}
				{navIsOpen && (
					<AiOutlineClose className={classes['nav__open-menu-icon']} />
				)}
			</button>
			<nav className={classes.nav}>
				<ul className={classes['nav__list']}>
					{isLogged && (
						<li className={classes['nav__item']}>
							<NavLink
								to="/all-todo"
								activeClassName={classes.active}
								className={classes['nav__link']}
								onClick={toggleNavHandler}
							>
								All Todo
							</NavLink>
						</li>
					)}
					{isLogged && (
						<li className={classes['nav__item']}>
							<NavLink
								to="/new-todo"
								activeClassName={classes.active}
								className={classes['nav__link']}
								onClick={toggleNavHandler}
							>
								New Todo
							</NavLink>
						</li>
					)}
					<li className={classes['nav__item']}>
						{!isLogged && (
							<NavLink
								to="/login"
								activeClassName={classes.active}
								className={classes['nav__link']}
								onClick={toggleNavHandler}
							>
								Login
							</NavLink>
						)}
						{isLogged && (
							<Link
								to="/"
								onClick={logoutHandler}
								className={classes['nav__link']}
							>
								Logout
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
