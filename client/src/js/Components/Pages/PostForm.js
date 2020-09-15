import React from 'react';
import { useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useForm from '@hooks/useForm';
import Form from '@formElements/Form';
import {FETCH_POSTS_QUERY} from '@queries/graphql';

function PostForm(){

	const { onChange, onSubmit, values } = useForm(createPostCallback, {
		body: ''
	});

	const [createPost] = useMutation(CREATE_POST_MUTATION, {

		variables:values,
		update(proxy, result) {
			try {
				const data = proxy.readQuery({
					query: FETCH_POSTS_QUERY
				});


				proxy.writeQuery({
					query: FETCH_POSTS_QUERY,
					variables: values,
					data: { getPosts: [result.data.createPost, ...data.getPosts] }
				});
			} catch (err) {
				return err;
			}
			values.body = '';
		}

	});

	function createPostCallback(){
		createPost();
	}

	const addPostInputs = [
		{
			type:'textarea',
			name:'body',
			inputIdentifier:'posts',
			label:'Post',
			isRequired:true,
			value:values.body
		}
	];

	return(
		<section>
			<h1>Post</h1>
			<Form
				inputs={addPostInputs}
				onSubmit={onSubmit}
				onChange={onChange}
				btnText={'Post'}
			/>
		</section>
	);
}


const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;



export default PostForm;
