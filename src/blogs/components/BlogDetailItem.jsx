import './BlogDetailItem.css';

const BlogDetailItem = (props) => {
	return (
		<div className='blogDetail__item'>
			<img src={props.image} alt={props.title} />
			<p>&nbsp;{props.description}</p>
		</div>
	);
};
export default BlogDetailItem;
