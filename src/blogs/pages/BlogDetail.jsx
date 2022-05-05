import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BlogDetailHeader from '../components/BlogDetailHeader';
import BlogDetailItem from '../components/BlogDetailItem';
import BlogDetailAuthor from '../components/BlogDetailAuthor';
import BlogComments from '../components/BlogComments';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogDetail.css';

const BlogDetail = () => {
	const { blogId } = useParams();
	const [blog, setBlog] = useState();

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();

	const fetchBlogDetail = useCallback(async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_BACKEND_URL}/blogs/${blogId}`
			);
			setBlog(responseData.blog);
		} catch (err) {}
	}, [blogId, sendRequest]);

	useEffect(() => {
		fetchBlogDetail();
	}, [sendRequest, blogId, fetchBlogDetail]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div>
					<LoadingSpinner asOverlay />
				</div>
			)}
			<div className='blogDetail'>
				{!isLoading && blog && (
					<>
						<BlogDetailHeader headerTitle={blog.title} />
						<BlogDetailItem
							id={blog.id}
							image={blog.image}
							title={blog.title}
							description={blog.description}
							creatorId={blog.creator.id}
						/>
						<BlogDetailAuthor
							creator={blog.creator.name}
							creatorInfo={blog.creatorInfo}
							avatar={blog.creator.avatar}
						/>
						<BlogComments
							comments={blog.comments}
							fetchBlog={fetchBlogDetail}
						/>
					</>
				)}
			</div>
		</>
	);
};
export default BlogDetail;
