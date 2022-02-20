import { useSelector } from 'react-redux';
import Card from '../UI/Card/Card';

import classes from './Welcome.module.css';

const Welcome = () => {
	const username = useSelector(state => state.auth.username);

	let titleText;
	if (username.length) {
		titleText = `WelCome, ${username}`;
	} else {
		titleText = 'Please Login';
	}

	return (
		<Card className={classes.welcome}>
			<header className={classes['welcome__header']}>
				<h1>{titleText}</h1>
			</header>
			<main className={classes['welcome__main']}>
				<ul>
					<li>Our App Function!</li>
					<li>1. You can create a todo item at New Todo</li>
					<li>2. The todo item can be update or delete</li>
					<li>
						3. If you forget your password, you can send the email to reset your
						password
					</li>
				</ul>
			</main>
		</Card>
	);
};

export default Welcome;
