import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './Nav.css';

const Nav = (props) => {
	const auth = useContext(AuthContext);

	return (
		<nav className='header-nav'>
			<ul
				className={
					props.mobile ? `header-nav__mobile` : 'header-nav__desktop'
				}
			>
				<li>
					<NavLink to='/'>BLOG</NavLink>
				</li>
				{auth.isLoggedIn && (
					<li>
						<NavLink to='/new'>Create</NavLink>
					</li>
				)}
				{!auth.isLoggedIn && (
					<li>
						<NavLink to='/auth'>Auth</NavLink>
					</li>
				)}
				<li>
					<NavLink to='/about'>About</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact</NavLink>
				</li>
				{auth.isLoggedIn && (
					<li onClick={auth.logout}>
						<NavLink to='/auth'>Logout</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
export default Nav;
