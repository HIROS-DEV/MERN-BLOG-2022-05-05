import { useEffect } from 'react';
import AOS from 'aos';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import ContactUs from '../components/ContactUs';
import 'aos/dist/aos.css';

const Contact = () => {
	useEffect(() => {
		AOS.init({
			duration: 1000,
		});
		AOS.refresh();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<BlogsHeader />
			<ContactUs aos='fade-up' />
		</div>
	);
};
export default Contact;
