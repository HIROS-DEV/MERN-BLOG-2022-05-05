import { Link } from 'react-router-dom';

const FooterExplore = () => {
	return (
		<div className='footer__explore'>
			<h2 className='footer__title'>EXPLORE</h2>
			<ul>
				<li className='footer__titleLi'>
					<Link to='/about'>
						<p>
							<span>
								<i className='fa-solid fa-right-long'></i>
							</span>
							About
						</p>
					</Link>
				</li>
				<li className='footer__titleLi'>
					<Link to='/'>
						<p>
							<span>
								<i className='fa-solid fa-right-long'></i>
							</span>
							Blog
						</p>
					</Link>
				</li>
				<li className='footer__titleLi'>
					<Link to='/contact'>
						<p>
							<span>
								<i className='fa-solid fa-right-long'></i>
							</span>
							Contact us
						</p>
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default FooterExplore;
