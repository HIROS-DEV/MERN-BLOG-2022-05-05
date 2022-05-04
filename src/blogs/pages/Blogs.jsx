import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

import BlogsHeader from '../../shared/components/Header/BlogsHeader';
import BlogsList from '../components/BlogsList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './Blogs.css';

const Blogs = () => {
	const pageNumber = useParams().pageNumber || 1;
	const [page, setPage] = useState(pageNumber);
	const [totalPages, setTotalPages] = useState(1);

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
	const [loadedBlogs, setLoadedBlogs] = useState();

	const blogDeleteHandler = (deletedBlogId) => {
		setLoadedBlogs((prevBlogs) =>
			prevBlogs.filter((blog) => blog.id !== deletedBlogId)
		);
	};

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/blogs?page=${page}`
				);
				setLoadedBlogs(responseData.blogs);
				setTotalPages(responseData.pages);
			} catch (err) {}
		};
		fetchBlogs();
	}, [sendRequest, page]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className='blogs'>
				<ErrorModal error={error} onClear={clearError} />
				{isLoading && (
					<div>
						<LoadingSpinner asOverlay />
					</div>
				)}
				{!isLoading && loadedBlogs && (
					<>
						<BlogsHeader />
						<BlogsList
							items={loadedBlogs}
							onDeleteBlog={blogDeleteHandler}
							page={page}
							totalPages={totalPages}
							changePage={setPage}
						/>
					</>
				)}
			</div>
		</>
	);
};
export default Blogs;
