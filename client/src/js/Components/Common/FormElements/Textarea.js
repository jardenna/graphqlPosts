import React, {Fragment} from 'react';

function TextArea(props){

	return(

		<Fragment>
			<label htmlFor={props.inputIdentifier}>{props.label}{props.isRequired && '*'}</label>
			<div className="input-wrapper">


				<textarea
					name={props.name}
					id={props.inputIdentifier}
					placeholder={props.placeholder}
					onChange={props.onChange}
					onFocus={props.onFocus}
					data-test='component-textarea'
					value={props.value}
				/>

				{props.error}
			</div>
		</Fragment>
	);




}
export default TextArea;
