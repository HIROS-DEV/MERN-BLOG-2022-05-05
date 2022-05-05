import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorModal from '../UIElements/ErrorModal';
import Loadingspinner from '../UIElements/LoadingSpinner';
import { useHttpClient } from '../../hooks/http-hook';

const FooterRecentPosts = () => {
	const { isLoading, error, sendRequest, clearError } =
		useHttpClient();
	const [loadedBlogs, setLoadedBlogs] = useState();

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/blogs`
				);
				const recentPosts = responseData.blogs.slice(0, 3);
				setLoadedBlogs(recentPosts);
			} catch (err) {}
		};
		fetchBlogs();
	}, [sendRequest]);

	return (
		<div className='footer_recentPosts'>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div>
					<Loadingspinner asOverlay />
				</div>
			)}
			{!isLoading && loadedBlogs && (
				<>
					<h2 className='footer__title'>RECENT POSTS</h2>
					<ul className='footer__recentPostsUl'>
						{loadedBlogs.map((blog) => (
							<li key={blog.id} className='footer__recentPostsLi'>
								<Link to={`/blog/${blog.id}`}>
									<div>
										<img src={blog.image} alt={blog.title} />
									</div>
									<div className='footer__recentPostsLi--rightWrapper'>
										<div className='footer__recentPostLi-creatorInfo'>
											<i className='fa-solid fa-calendar-days'></i>
											<p>{blog.createdAt}</p>
											<span className='footer__recentPostLi-creatorAvatar'>
												<img
													src={blog.creator.avatar}
													alt={blog.creator.name}
												/>
											</span>
											<p>{blog.creator.name}</p>
										</div>
										<p className='footer__recentPostsLi--title'>
											{blog.title}
										</p>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default FooterRecentPosts;
