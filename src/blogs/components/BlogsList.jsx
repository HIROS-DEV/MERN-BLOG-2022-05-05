import BlogItem from './BlogItem';
import './BlogsList.css';

const BlogsList = (props) => {
	if (props.items.length === 0) {
		return (
			<div className='center'>
				<h2>No blog found.</h2>
			</div>
		);
	}
	return (
		<ul>
			{props.items.map((blog, index) => (
				<BlogItem
					key={blog.id}
					id={blog.id}
					title={blog.title}
					description={blog.description}
					image={blog.image}
					creator={blog.creator}
					createdAt={blog.createdAt}
					index={index}
					//TODO: add comments props here!!!
				/>
			))}
		</ul>
	);
};
export default BlogsList;
