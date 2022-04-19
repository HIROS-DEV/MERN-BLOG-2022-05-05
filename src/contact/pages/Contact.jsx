import { useEffect } from 'react';

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return <div>Contact</div>;
};
export default Contact;
