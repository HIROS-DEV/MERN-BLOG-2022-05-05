import Avatar from '../../shared/components/UIElements/Avatar';
import './BlogDetailAuthor.css';

const BlogDetailAuthor = (props) => {
	return (
		<div className='blogDetail__author'>
			<div className='blogDetail__authorContainer'>
			<Avatar
				image={props.avatar}
				alt={props.creator}
				width='100px'
				height='100px'
				className='blogDetail'
			/>
			<div className='blogDetail__authorInfoContainer'>
				<h1>{props.creator}</h1>
				<p>{props.creatorInfo}</p>
			</div>
			</div>
		</div>
	);
};
export default BlogDetailAuthor;
