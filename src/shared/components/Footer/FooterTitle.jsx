import { Link } from 'react-router-dom';

const FooterTitle = () => {
	return (
		<div className='footer__titleWrapper'>
			<h1 className='footer__title'>MERN.</h1>
			<p>
				I AM A WEB DEVELOPER & <br />
				THIS IS MY MERN BLOG
			</p>
			<div className='footer__title-icons'>
				<Link to='/'>
					<i className='fa-brands fa-twitter-square'></i>
				</Link>
				<Link to='/'>
					<i className='fa-brands fa-facebook-square'></i>
				</Link>
				<Link to='/'>
					<i className='fa-brands fa-instagram-square'></i>
				</Link>
			</div>
		</div>
	);
};
export default FooterTitle;
