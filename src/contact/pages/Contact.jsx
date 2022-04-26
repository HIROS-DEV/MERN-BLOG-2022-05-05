import { useEffect } from 'react';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import ContactUs from '../components/ContactUs';

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<BlogsHeader />
			<ContactUs />
		</div>
	);
};
export default Contact;
