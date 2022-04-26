import './BlogsHeader.css';

const BlogsHeader = () => {
	return (
		<div className='blogs__header'>
			<div className='blogs__header-container'>
				<div className='blogs__header-textContainer'>
					<p>
						A PERSONAL <span>BLOG</span>
					</p>
				</div>
				<h1>
					H<span>ir</span>o.
				</h1>
				<div className='blogs__header-textWrapper'>
					<h2>
						I am a web developer &amp; <br />
						<span>This is MY MERN BLOG</span>
					</h2>
				</div>
			</div>
		</div>
	);
};
export default BlogsHeader;
