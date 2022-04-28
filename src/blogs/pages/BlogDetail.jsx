import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BlogDetailAuthor from '../components/BlogDetailAuthor';
import BlogDetailHeader from '../components/BlogDetailHeader';
import BlogDetailItem from '../components/BlogDetailItem';
import BlogComments from '../components/BlogComments';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './BlogDetail.css';

const BlogDetail = () => {
	const [blog, setBlog] = useState();

	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
	const { blogId } = useParams();

	useEffect(() => {
		const fetchBlogDetail = async () => {
			try {
				const responseData = await sendRequest(
					`http://localhost:5000/api/blogs/${blogId}`
				);
				setBlog(responseData.blog);
			} catch (err) {}
		};
		fetchBlogDetail();
	}, [sendRequest, blogId]);

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
						<BlogDetailHeader header={blog.title} />
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
							creator={blog.creator.name}
							creatorInfo={blog.creatorInfo}
							avatar={blog.creator.avatar}
							blog={blog}
						/>
					</>
				)}
			</div>
		</>
	);
};
export default BlogDetail;
