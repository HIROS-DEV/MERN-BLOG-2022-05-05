import { useEffect, useState } from 'react';

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import BlogsList from '../components/BlogsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Blogs.css';

const Blogs = () => {
	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
	const [loadedBlogs, setLoadedBlogs] = useState();

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/blogs`
				);
				setLoadedBlogs(responseData.blogs);
			} catch (err) {}
		};
		fetchBlogs();
	}, [sendRequest]);

	const blogDeleteHandler = (deletedBlogId) => {
		setLoadedBlogs((prevBlogs) =>
			prevBlogs.filter((blog) => blog.id !== deletedBlogId)
		);
	};

	return (
		<>
			<div className='blogs'>
				<ErrorModal error={error} onClear={clearError} />
				{isLoading && (
					<div className='center'>
						<LoadingSpinner asOverlay/>
					</div>
				)}
				{!isLoading && loadedBlogs && (
					<>
						<BlogsHeader />
						<BlogsList
							items={loadedBlogs}
							onDeleteBlog={blogDeleteHandler}
						/>
					</>
				)}
			</div>
		</>
	);
};
export default Blogs;
