import React from 'react';

function NavNew({variant, align, menuItems}){
	return(
		<nav className={`nav nav-${variant}`}>
			<ul className= {`${align ? 'text-' + align  : ''}`}>
				{menuItems.map(menuItem=>{
					return(
						<li key={menuItem.id}>
							{menuItem.menuText}

						</li>
					);
				})}

			</ul>
		</nav>
	);
}
export default NavNew;
