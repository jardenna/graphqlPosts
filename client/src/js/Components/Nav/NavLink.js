import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

function NavLink({  menuText, isActive, onClick, to }){
	return(
		<Link to={to}
			onClick={useCallback(() => onClick(menuText), [menuText])}
			className={`${isActive ? 'active' : ''}` }>
			{menuText}
		</Link>
	);
}
export default NavLink;
