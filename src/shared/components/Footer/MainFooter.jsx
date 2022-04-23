import { Link } from 'react-router-dom';
import './MainFooter.css';

const DUMMY_POSTS = [
	{
		id: 'p1',
		createdAt: new Date().toLocaleDateString(),
		creator: 'hiro',
		title: 'Creativity and Inspiration',
		image:
			'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
	},
];

const MainFooter = () => {
	return (
		<div className='footer'>
			<div>
				<h1>MERN.</h1>
				<p>
					A small river named Duden flows by their place and supplies
					it with the necessary regelialia.
				</p>
				<div>
					<i className='fa-brands fa-twitter-square'></i>
					<i className='fa-brands fa-facebook-square'></i>
					<i className='fa-brands fa-instagram-square'></i>
				</div>
			</div>
			<div>
				<h1>EXPLORE</h1>
				<ul>
					<li>
						<Link to='/about'>
							<i className='fa-solid fa-right-long'></i>
							<span>About</span>
						</Link>
					</li>
					<li>
						<Link to='/'>
							<i className='fa-solid fa-right-long'></i>
							<span>Blog</span>
						</Link>
					</li>
					<li>
						<Link to='/contact'>
							<i className='fa-solid fa-right-long'></i>
							<span>Contact us</span>
						</Link>
					</li>
				</ul>
			</div>
			<div>
				<h1>RECENT POSTS</h1>
			</div>
		</div>
	);
};
export default MainFooter;
