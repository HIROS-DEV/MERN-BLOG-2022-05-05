import { memo } from 'react';
import BlogItem from './BlogItem';
import Pagination from './Pagination';
import './BlogsList.css';

const BlogsList = ({
	items,
	onDeleteBlog,
	page,
	totalPages,
	changePage,
}) => {
	if (items.length === 0) {
		return (
			<div className='blogslist__notfound'>
				<h2>No blog yet...</h2>
			</div>
		);
	}

	return (
		<ul>
			{items.map((blog, index) => (
				<BlogItem
					key={blog.id}
					id={blog.id}
					title={blog.title}
					description={blog.description}
					image={blog.image}
					creator={blog.creator.name}
					avatar={blog.creator.avatar}
					creatorId={blog.creator.id}
					createdAt={new Date(blog.createdAt).toLocaleDateString()}
					index={index}
					onDelete={onDeleteBlog}
					comments={blog.comments}
				/>
			))}
			<Pagination
				page={page}
				pages={totalPages}
				changePage={changePage}
			/>
		</ul>
	);
};
export default memo(BlogsList);
