import React from 'react';

import  NavLink  from './NavLink';
import {menuLoginItems, menuLogOutItems} from './menuItems';
import {AuthContext} from '../../context/auth';


function Nav({align, variant}){

	const {user, logout} = React.useContext(AuthContext);

	//Find out which page we are at, based on url
	const pathname = window.location.pathname.substr(1);
	const path = pathname === '' ? 'Home' : pathname.charAt(0).toUpperCase() + pathname.slice(1);

	const [active, setActive] = React.useState(path);

	return(
		<nav className={`nav nav-${variant}`}>
			<ul className={`${align ? 'text-' + align  : ''}`}>
				{!user ? menuLoginItems.map(item => {
					return(
						<li key={item.id} >
							<NavLink
								{...item}
								onClick={setActive}
								isActive={active === item.menuText} />
						</li>
					);
				}):
					menuLogOutItems.map(item => {
						return(
							<li key={'logout' +item.id} >
								<NavLink
									{...item}
									onClick={logout}
								/>
							</li>
						);
					})

				}
			</ul>
			{user && <h1>Welcome {user.username}</h1>}
		</nav>

	);
}
export default Nav;
