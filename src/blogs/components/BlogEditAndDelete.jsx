import { Link } from 'react-router-dom';

const BlogEditAndDelete = ({ id, onDelete }) => {
	return (
		<div className='blogDetail__icons'>
			<Link to={`/blog/edit/${id}`}>
				<i className='fa-solid fa-pen-to-square'></i>
			</Link>
			<i
				className='fa-solid fa-trash'
				onClick={onDelete}
			></i>
		</div>
	);
};
export default BlogEditAndDelete;
