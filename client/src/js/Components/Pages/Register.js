import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useForm from '@hooks/useForm';
import {AuthContext} from '@context/auth';
import Form from '@formElements/Form';

function Register(props){

	const context = React.useContext(AuthContext);

	const initialState = {
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const { onChange, onSubmit, values } = useForm(registerUser, initialState);
	const [errors, setErrors] = React.useState({});
	const registerInputs=[
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
			name:'email',
			type:'email',
			inputIdentifier:'email',
			label:'Email',
			isRequired:true,
			error:errors.email,
			value:values.email
		},
		{
			name:'password',
			type:'password',
			inputIdentifier:'password',
			label:'Password',
			isRequired:true,
			error:errors.password,
			value:values.password
		},
		{
			name:'confirmPassword',
			type:'password',
			inputIdentifier:'confirmPassword',
			label:'Confirm Password',
			isRequired:true,
			error:errors.confirmPassword,
			value:values.confirmPassword
		}

	];
	const [addUser, {loading}] = useMutation(REGISTER_USER, {
		update(_, result){
			context.login(result.data.login);
			props.history.push('/');
		},
		onError(err){
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	}	);

	function registerUser() {
		addUser();
	}

	if (loading) {
		return 'Loading...';
	}

	return(
		<section>
			<h1>Register</h1>
			<Form
				inputs={registerInputs}
				onSubmit={onSubmit}
				onChange={onChange}
				btnText={'Register'}
			/>
		</section>
	);
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
