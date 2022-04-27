import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import ContactUs from '../components/ContactUs';

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
		AOS.refresh();
	}, []);
	return (
		<div>
			<BlogsHeader />
			<ContactUs aos='fade-up' />
		</div>
	);
};
export default Contact;
