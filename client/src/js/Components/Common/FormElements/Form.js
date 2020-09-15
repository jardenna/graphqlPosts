import React, {Fragment} from 'react';

import Input from '@formElements/Input';
import TextArea from '@formElements/TextArea';
import Button from '@commonReact/Button';


function Form(props){

	const btnClass = `btn-${props.btnVaiant ? props.btnVaiant : 'primary' }`;

	return(
		<form  onSubmit={props.onSubmit} noValidate>
			{
				props.inputs.map(input=>{
					return(
						<Fragment key={input.inputIdentifier}>
							{input.type !== 'textarea' ? <Input
								type={input.type}
								name={input.name}
								value={input.value}
								onChange={props.onChange}
								inputIdentifier={input.inputIdentifier}
								label={input.label}
								isRequired={input.isRequired}
								error={input.error}
							/>:
								<TextArea
									name={input.name}
									value={input.value}
									onChange={props.onChange}
									inputIdentifier={input.inputIdentifier}
									label={input.label}
									isRequired={input.isRequired}
									error={input.error}
								/>
							}
						</Fragment>
					);
				})
			}
			<Button
				type='submit'
				className={btnClass}
				text={props.btnText}
			/>
		</form>
	);
}
export default Form;
