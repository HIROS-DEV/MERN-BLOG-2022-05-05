const FooterCopyright = () => {
	return (
		<div className='footer__copyright'>
			<p>
				Copyright &copy; {new Date().getFullYear()} HIRO | All rights
				reserved
			</p>
			<div className='footer__copyright-bottomContainer'>
				<p>
					I created the site all by myself absolutely. <br />
					But I am a web developer, not web designer. <br />
					Therefore I created the site based on{' '}
					<a
						href='https://preview.colorlib.com/theme/axole/index.html'
						target='_blank'
						rel='noreferrer'
					>
						Colorlib
					</a>
					&nbsp;template design.
				</p>
			</div>
		</div>
	);
};
export default FooterCopyright;
