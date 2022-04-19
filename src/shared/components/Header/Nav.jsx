import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav = (props) => {
	return (
		<nav className='header-nav'>
			<ul
				className={
					props.mobile
						? `header-nav__mobile`
						: 'header-nav__desktop'
				}
			>
				<li>
					<NavLink to='/'>BLOG</NavLink>
				</li>
				<li>
					<NavLink to='/new'>Create</NavLink>
				</li>
				<li>
					<NavLink to='/auth'>Auth</NavLink>
				</li>
				<li>
					<NavLink to='/about'>About</NavLink>
				</li>
				<li>
					<NavLink to='/contact'>Contact</NavLink>
				</li>
			</ul>
		</nav>
	);
};
export default Nav;
