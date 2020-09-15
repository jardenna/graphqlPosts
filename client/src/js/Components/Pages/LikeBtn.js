import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Button from '@commonReact/Button';




function LikeBtn({user,  post}){

	//Add class depending if user is login og not and have liked or not
	//const variant = user ? 'primary' : 'basic';



	const [liked, setLiked] = React.useState(false);


	//You cannot like your own post
	//const currentUser = post && post.likes.map(a=>a.username).includes(user.username);


	const [likePost] = useMutation(LIKE_POSTS , {

		variables: {postId:post.id}

	});



	React.useEffect(()=>{
		if (user && post.likes.find(like=> like.username === user.username)) {
			setLiked(true);
		}else {
			setLiked(false);
		}

	}, [user, post.likes]);




	const likeButton = user  ? (
		liked  ? (
			<Button
				variant='primary'
				icon={'heart'}
				title={'Like this post'}
				text={post.likeCount}
				onClick={likePost}
			/>
		) : (
			<Button
				variant='basic'
				icon={'heart'}
				title={'Like this post'}
				text={post.likeCount}
				onClick={ likePost}
			/>
		)
	): (
		<Button
			variant='basic'
			icon={'heart'}
			title={'Like this post'}
			text={post.likeCount}
			as={Link}
			to={'login'}
		/>
	);

	return(
		<div>	{likeButton}</div>
	);
}
export default LikeBtn;

const LIKE_POSTS = gql`
	mutation likePost($postId: ID!){
		likePost(postId:$postId){
			id
			likes{
				id
				username
			}
			likeCount
		}
	}`;
