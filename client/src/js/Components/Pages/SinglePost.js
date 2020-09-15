import React, {Fragment} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {AuthContext} from '@context/auth';
import Card from '@commonReact/Card';
import LikeBtn from './LikeBtn';
import DeleteBtn from './DeleteBtn';
import { Link } from 'react-router-dom';
import Button from '@commonReact/Button';
import userIcon from '@img/icon.jpg';
//import useForm from '@hooks/useForm';
//import Form from '@formElements/Form';

function SinglePost(props){
	// const { onChange, onSubmit, values } = useForm(createCommentCallback, {
	// 	body: ''
	// });


	const postId = props.match.params.postId;
	const { user } = React.useContext(AuthContext);
	const [comment, setComment] = React.useState('');

	const deleteCallback = ()=>  props.history.push('/');

	const [submitComment] = useMutation(CREATE_COMMENT, {

		variables: {
			postId,
			body: comment
		},
		update(){
			setComment('');
		}
	});
	const {data, loading	} = useQuery(GET_SINGLE_POST, {
		variables: {
			postId
		}
	});

	if (loading) {
		return 'Loading';
	}

	const post = data && data.getPost;
	const { body, createdAt,  username, likeCount, likes, commentCount, comments} = post;
	const showBtnThird = user &&  user.username === username;


	// const CommentInputs =[		{
	// 	type:'textarea',
	// 	name:'body',
	// 	inputIdentifier:'addComment',
	// 	label:'Comment',
	// 	isRequired:true,
	// 	value:values.body
	// }];

	return(
		<Fragment>
			<Card
				username={username}
				date={createdAt}
				body={body}
				src={userIcon}
				alt="User Icon"
				btnFirst={
					<LikeBtn user={user} post={{postId, likeCount, likes}}/>
				}
				btnSecond={
					<Button
						variant='primary'
						text={commentCount}
						icon={'comment'}
						title={'Comment on this post'}
						as={Link}
						to={ `/post/${postId}`}
					/>
				}

				btnThird={
					<DeleteBtn
						postId = {postId}

						callback = {deleteCallback}
					/>
				}
				showBtnThird={showBtnThird}
			/>
			{comments.map(comment=>{
				const {id, body, createdAt,  username} = comment;

				const showBtnThird = user &&  user.username === username;
				return(
					<Fragment key={id}>
						<Card
							username={username}
							date={createdAt}
							body={body}
							src={userIcon}
							alt="User Icon"

							btnFirst={
								<LikeBtn user={user} post={{postId, likeCount, likes}}/>
							}
							btnThird={
								<DeleteBtn
									callback = {deleteCallback}
									postId = {postId}
									commentId = {id}
								/>
							}
							showBtnThird={showBtnThird}
						/>
					</Fragment>
				);
			})}

			{
				user && <form>
					<input
						type="text"
						name="comment"
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
					<Button
						type='submit'
						btnClass={'primary'}
						text='Submit'
						onClick={submitComment}

					/>
				</form>
			}

		</Fragment>
	);
}
export default SinglePost;

const GET_SINGLE_POST = gql`
query($postId: ID!) {
  getPost(postId: $postId) {
    id
    body
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;

const CREATE_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
