import { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validators';
import './Input.css';

/************************INPUT_REDUCER CONFIG*********************************/
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

/************************INPUT COMPONENTS*********************************/
const Input = (props) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: props.initialValue || '',
		isTouched: false,
		isValid: props.initialValid || false,
	});

	const { id, onInput } = props;
	const { value, isValid } = inputState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const changeHandler = (e) => {
		dispatch({
			type: 'CHANGE',
			value: e.target.value,
			validators: props.validators,
		});
	};

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH',
		});
	};

	const element =
		props.element === 'input' ? (
			<input
				id={props.id}
				type={props.type}
				placeholder={props.placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				autoComplete='off'
				className={props.className}
			/>
		) : (
			<textarea
				name={props.name}
				id={props.id}
				rows={props.rows || 20}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
				autoComplete='off'
				className={props.className}
			/>
		);

	return (
		<div
			className={`form-control ${
				!inputState.isValid &&
				inputState.isTouched &&
				'form-control--invalid'
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			{element}
			{!inputState.isValid && inputState.isTouched && (
				<p>{props.errorText}</p>
			)}
		</div>
	);
};
export default Input;
