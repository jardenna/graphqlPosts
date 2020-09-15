import React from 'react';
import {Route, BrowserRouter as Router } from 'react-router-dom';


import Nav from './Nav';
import AuthRoute from './Nav/AuthRoute';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SinglePost from './Pages/SinglePost';

import {AuthProvider} from '../context/auth';



function App() {

	return(
		<AuthProvider>
			<Router>
				<article className="main-wrapper">
					<Nav
						variant="horizontal"
						align="right"
					/>
					<Route exact path="/" component={Home} />
					<AuthRoute path="/login" component={Login}/>
					<AuthRoute path="/register" component={Register} />
					<Route exact path="/post/:postId" component={SinglePost} />

				</article>
			</Router>
		</AuthProvider>
	);
}

export default App;
