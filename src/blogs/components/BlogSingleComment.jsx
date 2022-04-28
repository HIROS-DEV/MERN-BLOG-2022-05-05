import { useState, memo } from 'react';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import './BlogSingleComment.css';

const BlogSingleComment = ({ comment }) => {
	const [openReply, setOpenReply] = useState(false);
	return (
		<div className='singleComment'>
			<div className='singleComment__imgContainer'>
				<img
					src={comment.creator.avatar}
					alt={comment.creator.name}
				/>
			</div>
			<div className='singleComment__infoContainer'>
				<h2>{comment.creator.name}</h2>
				<h5>
					{new Date(comment.creator.createdAt).toLocaleDateString()}
				</h5>
				<p>{comment.comment}</p>
				<Button
					onClick={() => setOpenReply((prevState) => !prevState)}
				>
					Reply
				</Button>

				{openReply && (
					<div className='singleComment__reply'>
						<form>
							<Input
								id='comment'
								placeholder='LEAVE YOUR COMMENTS'
								validators={[
									VALIDATOR_REQUIRE(),
									VALIDATOR_MAXLENGTH(300000),
								]}
								element='input'
								errorText='Please enter valid comments'
								onInput={() => {}}
							/>
							<Button type='submit' info>
								Comment
							</Button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};
export default memo(BlogSingleComment);
