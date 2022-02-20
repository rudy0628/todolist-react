import classes from './Spinner.module.css';

const Spinner = () => {
	return (
		<div className="centered">
			<div className={classes['lds-dual-ring']}></div>
		</div>
	);
};

export default Spinner;
