import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

function Button({as:As = 'button', icon, type, onClick, text, variant, href, title, to}){
	return(
		<Fragment>


			<As
				type={type}
				href={href}
				title={title}
				className={`btn-${variant}`}
				onClick={onClick}
				to={to}>
				{icon && 	<span className={`icon-${icon}`}/>}		{text}
			</As>
		</Fragment>
	);
}
export default Button;


Button.propTypes ={
	type: PropTypes.string,
	icon: PropTypes.string,
	href: PropTypes.string,
	title: PropTypes.string,
	variant:PropTypes.string,
	text:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onClick: PropTypes.func
};
