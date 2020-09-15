import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {FETCH_POSTS_QUERY} from '@queries/graphql';

function DeleteBtn({postId, callback,  commentId}){
	const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
	const [deletePostOrMutation] = useMutation(mutation, {
		update(proxy) {

			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				});
				data.getPosts = data.getPosts.filter((p) => p.id !== postId);
				proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			}
			if (callback) callback();
		},
		variables: {
			postId,
			commentId
		}
	});


	return(
		<span className="icon-trash" onClick={deletePostOrMutation}/>
	);
}
export default DeleteBtn;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
mutation deleteComment($postId: ID!, $commentId: ID!) {
  deleteComment(
    postId: $postId
    commentId: $commentId
  ) {
		id
		comments {
			id
			username
			createdAt
			body
		}
		commentCount
  }
}
`;
