import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import WelcomePage from './pages/welcome-page';
import Layout from './components/layout/Layout';
import Spinner from './components/UI/spinner/Spinner';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, sendData } from './store/todo-slice';
import { authAction } from './store/auth-slice';

// lazy loading
const AllTodoPage = React.lazy(() => import('./pages/all-todo-page'));
const NewTodoPage = React.lazy(() => import('./pages/new-todo-page'));
const LoginPage = React.lazy(() => import('./pages/login-page'));

function App() {
	const dispatch = useDispatch();
	const isLogged = useSelector(state => state.auth.isLogged);
	const todoItems = useSelector(state => state.todo.todoItems);
	const userId = localStorage.getItem('userId');
	const expirationTime = localStorage.getItem('expirationTime');
	const username = localStorage.getItem('username');

	// rewrite current auth and the current user todo data when app load
	useEffect(() => {
		if (userId) {
			dispatch(
				authAction.login({
					expirationTime: expirationTime,
					userId: userId,
					username: username,
				})
			);

			dispatch(getData(userId));
		}
	}, [dispatch, userId, expirationTime, username]);

	// when todoItems change, updated new 0data to firebase
	useEffect(() => {
		if (userId) {
			dispatch(sendData(todoItems, userId));
		}
	}, [dispatch, todoItems, userId]);

	//suspense is related to lazy loading

	return (
		<Layout>
			<Suspense
				fallback={
					<div className="centered">
						<Spinner />
					</div>
				}
			>
				<Switch>
					<Route path="/" exact>
						<WelcomePage />
					</Route>
					<Route path="/all-todo">
						{!isLogged && <Redirect to="/login" />}
						{isLogged && <AllTodoPage />}
					</Route>
					<Route path="/new-todo">
						{!isLogged && <Redirect to="/login" />}
						{isLogged && <NewTodoPage />}
					</Route>
					<Route path="/login">
						{!isLogged && <LoginPage />}
						{isLogged && <Redirect to="/" />}
					</Route>
					<Route path="*"></Route>
				</Switch>
			</Suspense>
		</Layout>
	);
}

export default App;
