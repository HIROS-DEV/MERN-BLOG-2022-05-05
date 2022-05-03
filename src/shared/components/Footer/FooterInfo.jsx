const FooterInfo = () => {
	return (
		<div className='footer__info'>
			<h2 className='footer__title'>HAVE A QUESTIONS?</h2>
			<ul className='footer__infoUl'>
				<li className='footer__infoLi'>
					<i className='fa-solid fa-map'></i>
					<address>15-1, Nihonbashi 1-chome, Chuo-ku, Tokyo</address>
				</li>
				<li className='footer__infoLi'>
					<i className='fa-solid fa-phone'></i>
					<p>+8129-532-5510</p>
				</li>
				<li className='footer__infoLi'>
					<i className='fa-solid fa-paper-plane'></i>
					<p>hirosdev@gmail.com</p>
				</li>
			</ul>
		</div>
	);
};
export default FooterInfo;
