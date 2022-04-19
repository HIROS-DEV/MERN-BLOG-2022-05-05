import { useEffect } from 'react';

import './NewBlog.css';

const NewBlog = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return <div>NewBlog</div>;
};
export default NewBlog;
