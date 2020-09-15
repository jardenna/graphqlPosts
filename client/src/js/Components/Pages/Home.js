import React, {Fragment} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import {AuthContext} from '@context/auth';
import {FETCH_POSTS_QUERY} from '@queries/graphql';

import PostForm from './PostForm';
import Card from '@commonReact/Card';
import userIcon from '@img/icon.jpg';
import Button from '@commonReact/Button';
import LikeBtn from './LikeBtn';
import DeleteBtn from './DeleteBtn';

function Home(){
	const { user } = React.useContext(AuthContext);
	const { loading, data  } = useQuery(FETCH_POSTS_QUERY);
	const posts= data && data.getPosts;

	if (loading) {
		return(
			'Loading...'
		);
	}

	return(
		<Fragment>

			<h1>Create posts</h1>
			{user && 	<PostForm	/>}


			<section className="flex-wrapper">
				{posts.map(post=>{

					const {id,body, username, createdAt, commentCount, likeCount, likes} = post;
					const showBtnThird = user &&  user.username === post.username;
					return(

						<div key={post.id}  className="flex-item">


							<Card
								body={body}
								to={ `/post/${id}`}
								username={username}
								date={createdAt}
								src={userIcon}
								alt="User Icon"
								btnSecond={
									<Button
										variant='primary'
										text={commentCount}
										icon={'comment'}
										title={'Comment on this post'}
										as={Link}
										to={ `/post/${id}`}
									/>
								}
								btnFirst={
									<LikeBtn user={user} post={{id, likeCount, likes}}/>
								}
								btnThird={
									<DeleteBtn
										postId={id}
									/>
								}
								showBtnThird={showBtnThird}
							/>

						</div>
					);
				})}
			</section>
		</Fragment>
	);
}

export default Home;
