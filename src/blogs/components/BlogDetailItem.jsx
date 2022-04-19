import { Link } from 'react-router-dom';
import './BlogDetailItem.css';

const BlogDetailItem = (props) => {
	return (
		<div className='blogDetail__item'>
			<div className='blogDetail__icons'>
				<Link to={`/blog/edit/${props.id}`}>
					<i className='fa-solid fa-pen-to-square'></i>
				</Link>
				<i className='fa-solid fa-trash'></i>
			</div>
			<img src={props.image} alt={props.title} />
			<p>&nbsp;{props.description}</p>
		</div>
	);
};
export default BlogDetailItem;
