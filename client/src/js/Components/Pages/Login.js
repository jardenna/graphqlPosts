import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';


import useForm from '@hooks/useForm';
import {AuthContext} from '@context/auth';
import Form from '@formElements/Form';


function Login(props) {
	const context = React.useContext(AuthContext);
	const [errors, setErrors] = React.useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: ''
	});

	const loginInputs=[
		{
			name:'username',
			type:'text',
			inputIdentifier:'username',
			label:'Username',
			isRequired:true,
			error:errors.username,
			value:values.username
		},
		{
			name:'password',
			type:'password',
			inputIdentifier:'password',
			label:'Password',
			isRequired:true,
			error:errors.password,
			value:values.password
		}

	];

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(
			_,
			{
				data: { login: userData }
			}
		) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		loginUser();
	}



	if (loading) {
		return 'Loading...';
	}
	return(
		<section>
			<h1>Log in</h1>

			<Form
				inputs={loginInputs}
				onSubmit={onSubmit}
				onChange={onChange}
				btnText={'Login'}
				btnVaiant={'primary'}
			/>

		</section>
	);
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
