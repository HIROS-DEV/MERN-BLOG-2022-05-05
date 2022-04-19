import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
	return (
		<div className='header__logo'>
			<Link to='/'>
				<h1>MERN.</h1>
			</Link>
		</div>
	);
};
export default Logo;
