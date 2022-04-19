import { useState } from 'react';

import Logo from './Logo';
import Nav from './Nav';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import './MainHeader.css';

const MainHeader = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(false);
	};

	return (
		<header className='header'>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			<div className='header__container'>
				<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
					<MobileMenu />
				</SideDrawer>
				<Logo />
				<Nav mobile={false} />
				<Menu onClick={openDrawerHandler} />
			</div>
		</header>
	);
};
export default MainHeader;
