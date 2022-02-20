import { createSlice } from '@reduxjs/toolkit';
import { modalActions } from './modal-slice';

let logoutTimer;

const authInitialState = {
	userId: '',
	username: '',
	isLogged: false,
};

const calculateRemainingTime = expirationTime => {
	const currentDate = new Date().getTime();
	const expirationDate = new Date(expirationTime).getTime();

	const remainingTime = expirationDate - currentDate;

	return remainingTime;
};

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			state.isLogged = true;
			state.userId = action.payload.userId;
			state.username = action.payload.username;

			const remainingTime = calculateRemainingTime(
				action.payload.expirationTime
			);

			// store to local storage, for app reload to fetch data
			localStorage.setItem('expirationTime', action.payload.expirationTime);
			localStorage.setItem('userId', action.payload.userId);
			localStorage.setItem('username', action.payload.username);

			logoutTimer = setTimeout(authAction.logout, remainingTime);
		},
		logout(state) {
			state.isLogged = false;
			state.userId = '';
			state.username = '';

			localStorage.removeItem('expirationTime');
			localStorage.removeItem('userId');
			localStorage.removeItem('username');

			if (logoutTimer) {
				clearTimeout(logoutTimer);
			}
		},
	},
});

export const sendUserData = (
	email,
	password = '',
	username = '',
	inputType
) => {
	return async dispatch => {
		// check inputType to different url
		let url;
		if (inputType === 'LOGIN') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzVfv1W3pAX4ikPSStYD2KuwimmyNJejM';
		} else if (inputType === 'SIGNUP') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzVfv1W3pAX4ikPSStYD2KuwimmyNJejM';
		} else if (inputType === 'FIND') {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCzVfv1W3pAX4ikPSStYD2KuwimmyNJejM';
		}

		// set different send body for different input type
		let sendBodyData;
		if (inputType === 'FIND') {
			sendBodyData = {
				requestType: 'PASSWORD_RESET',
				email: email,
			};
		} else if (inputType === 'SIGNUP') {
			sendBodyData = {
				displayName: username,
				email: email,
				password: password,
				returnSecureToken: true,
			};
		} else if (inputType === 'LOGIN') {
			sendBodyData = {
				email: email,
				password: password,
				returnSecureToken: true,
			};
		}

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(sendBodyData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			if (response.ok) {
				// if type equals find
				if (inputType === 'FIND') {
					dispatch(
						modalActions.addModal({
							title: 'Success',
							message: 'The Password Reset Was Send To Your Email!',
						})
					);
					return;
				}

				const expirationTime = new Date(
					new Date().getTime() + +data.expiresIn * 1000
				);

				dispatch(
					authAction.login({
						expirationTime: expirationTime.toISOString(),
						userId: data.localId,
						username: data.displayName,
					})
				);
			} else {
				throw new Error(data.error.message);
			}
		} catch (e) {
			dispatch(
				modalActions.addModal({
					title: 'Error',
					message: e.message,
				})
			);
		}
	};
};

export default authSlice;
export const authAction = authSlice.actions;
