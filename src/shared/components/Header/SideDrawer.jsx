import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

const SideDrawer = (props) => {
	const nodeRef = useRef();
	const content = (
		<CSSTransition
			in={props.show}
			timeout={200}
			classNames='slide-in-right'
			mountOnEnter
			unmountOnExit
			nodeRef={nodeRef}
		>
			<aside className='side-drawer' onClick={props.onClick}>{props.children}</aside>
		</CSSTransition>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById('drawer-hook')
	);
};
export default SideDrawer;
