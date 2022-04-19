import Nav from './Nav';
import './MobileMenu.css';

const MobileMenu = () => {
	return (
		<aside className='header__mobileMenu'>
            <Nav mobile={true} className={"mobileMenu"}/>
		</aside>
	);
};
export default MobileMenu;
