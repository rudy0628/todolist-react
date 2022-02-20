import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendUserData } from '../../store/auth-slice';

import useInput from '../../hooks/use-input';
import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import classes from './Login.module.css';

const isEmail = value => value.trim().includes('@');
const isPassword = value => value.trim().length > 7;
const isNotEmpty = value => value.trim().length > 0;

const Login = () => {
	// [LOGIN, SIGNUP, FIND]
	const [inputType, setInputType] = useState('LOGIN');
	const dispatch = useDispatch();

	// helper function
	const inputReset = () => {
		emailReset();
		passwordReset();
		usernameReset();
	};

	//use custom hook useInput to validate and listen the input
	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		inputChangeHandler: emailInputChangeHandler,
		inputBlurHandler: emailInputBlurHandler,
		reset: emailReset,
	} = useInput(isEmail);

	const {
		value: passwordValue,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		inputChangeHandler: passwordInputChangeHandler,
		inputBlurHandler: passwordInputBlurHandler,
		reset: passwordReset,
	} = useInput(isPassword);

	const {
		value: usernameValue,
		isValid: usernameIsValid,
		hasError: usernameHasError,
		inputChangeHandler: usernameInputChangeHandler,
		inputBlurHandler: usernameInputBlurHandler,
		reset: usernameReset,
	} = useInput(isNotEmpty);

	let formIsValid;
	if (inputType === 'FIND') {
		formIsValid = emailIsValid;
	} else if (inputType === 'SIGNUP') {
		formIsValid = emailIsValid && passwordIsValid && usernameIsValid;
	} else if (inputType === 'LOGIN') {
		formIsValid = emailIsValid && passwordIsValid;
	}

	const changeAuthModeHandler = () => {
		if (inputType === 'LOGIN') {
			setInputType('SIGNUP');
		} else {
			setInputType('LOGIN');
		}

		inputReset();
	};

	const forgetPasswordHandler = () => {
		setInputType('FIND');

		inputReset();
	};

	const submitHandler = async e => {
		e.preventDefault();

		if (!formIsValid) return;

		//send request
		dispatch(sendUserData(emailValue, passwordValue, usernameValue, inputType));

		inputReset();
	};

	// login form text
	let headerText, formBtnText, changeModeText, forgetPasswordText;
	if (inputType === 'LOGIN') {
		headerText = 'Sign In';
		formBtnText = 'Login';
		changeModeText = "Haven't Account ? Create Here !";
		forgetPasswordText = 'Forget Password ? Click Here';
	} else if (inputType === 'SIGNUP') {
		headerText = 'Sign Up';
		formBtnText = 'Submit';
		changeModeText = 'Have Account ? Sign In !';
		forgetPasswordText = 'Forget Password ? Click Here';
	} else {
		headerText = 'Find Password';
		formBtnText = 'Send Email';
		changeModeText = 'Have Account ? Sign In !';
		forgetPasswordText = '';
	}

	return (
		<Card className={classes['login-form']}>
			<h1 className={classes['login-form__title']}>{headerText}</h1>
			<form onSubmit={submitHandler}>
				<Input
					input={{ type: 'email', id: 'email' }}
					label="Email"
					value={emailValue}
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					isError={emailHasError}
				/>
				{inputType !== 'FIND' && (
					<Input
						input={{ type: 'password', id: 'password' }}
						label="Password"
						value={passwordValue}
						onChange={passwordInputChangeHandler}
						onBlur={passwordInputBlurHandler}
						isError={passwordHasError}
					/>
				)}
				{inputType === 'SIGNUP' && (
					<Input
						input={{ type: 'text', id: 'name' }}
						label="Username"
						value={usernameValue}
						onChange={usernameInputChangeHandler}
						onBlur={usernameInputBlurHandler}
						isError={usernameHasError}
					/>
				)}
				<div className={classes['login-form__btn-group']}>
					<Button
						className={classes['login-form__btn']}
						disabled={!formIsValid}
					>
						{formBtnText}
					</Button>
				</div>
			</form>
			<div>
				<button
					onClick={changeAuthModeHandler}
					className={classes['login-form__btn-change']}
				>
					{changeModeText}
				</button>
				<button
					onClick={forgetPasswordHandler}
					className={classes['login-form__btn-forget']}
				>
					{forgetPasswordText}
				</button>
			</div>
		</Card>
	);
};

export default Login;
