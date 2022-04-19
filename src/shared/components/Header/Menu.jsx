import './Menu.css';

const Menu = (props) => {
	return (
		<nav className="header__menu">
			<i className='fa-solid fa-bars fa-2x' onClick={props.onClick}></i>
		</nav>
	);
};
export default Menu;
