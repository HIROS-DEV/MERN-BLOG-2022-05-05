import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import BlogSingleComment from './BlogSingleComment';
import './ReplyComment.css'

const ReplyComment = ({ comments, parentCommentId }) => {
	const { blogId } = useParams();

	const [ChildCommentNumber, setChildCommentNumber] = useState(0);
	const [OpenReplyComments, setOpenReplyComments] = useState(false);

	useEffect(() => {
		let commentNumber = 0;
		// eslint-disable-next-line array-callback-return
		comments.map((comment) => {
			if (comment.responseTo === parentCommentId) {
				commentNumber++;
			}
		});
		setChildCommentNumber(commentNumber);
	}, [comments, parentCommentId]);

	const handleChange = () => {
		setOpenReplyComments((prevState) => !prevState);
	};

	const renderReplyComment = (parentCommentId) =>
		comments.map(
			(comment) =>
				comment.responseTo === parentCommentId && (
					<div
						key={comment.id}
						className='comments__singleContainer'
						style={{ width: '80%', marginLeft: '30px', borderBottom:"1px solid #666666" }}
					>
						<BlogSingleComment
							key={comment.id}
							comment={comment}
							blogId={blogId}
						/>
						<ReplyComment
							comment={comment}
							comments={comments}
							parentCommentId={comment._id}
						/>
					</div>
				)
		);
	
	return (
		<div className='replycomment'>
			{ChildCommentNumber > 0 && (
				<p
					onClick={handleChange}
					style={{
						fontSize: '14px',
						margin: 0,
						color: 'gray',
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer',
					}}
				>
					<AiFillCaretDown /> View {ChildCommentNumber}
					{ChildCommentNumber === 1 ? ' reply' : ' replies'}
				</p>
			)}
			{comments &&
				OpenReplyComments &&
				renderReplyComment(parentCommentId)}
		</div>
	);
};
export default memo(ReplyComment);
