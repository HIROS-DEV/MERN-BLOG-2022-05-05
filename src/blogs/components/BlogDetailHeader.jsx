import {memo} from 'react'
import './BlogDetailHeader.css';

const BlogDetailHeader = (props) => {
	return (
		<header className='blogDetail__header'>
			<h1>{props.header}</h1>
		</header>
	);
};
export default memo(BlogDetailHeader);