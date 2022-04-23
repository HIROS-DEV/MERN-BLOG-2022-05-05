import './LoadingSpinner.css';

const Loadingspinner = (props) => {
	return (
		<div
			className={`${props.asOverlay && 'loading-spinner__overlay'}`}
		>
			<div className='lds-dual-ring'></div>
		</div>
	);
};
export default Loadingspinner;
