import { memo } from 'react';
import './BlogDetailHeader.css';

const BlogDetailHeader = ({ headerTitle }) => {
	return (
		<header className='blogDetail__header'>
			<h1>{headerTitle}</h1>
		</header>
	);
};
export default memo(BlogDetailHeader);
