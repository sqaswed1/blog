/* eslint-disable consistent-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useRegisterUserMutation } from '../../../api';
import { onTokenAdd } from '../../../store/userSlice';

import './sign-up-form.scss';

export default function SignUpForm() {
	const patternEmail =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [registerUser, { data, isError }] = useRegisterUserMutation();
	
	useEffect(() => {
		if (data) {
			const {token} = data.user;
			const {username} = data.user;
			const {password} = data.user;
			const {email} = data.user;
			dispatch(onTokenAdd({ token, username, password, email }));
		}
	}, [data, dispatch]);

	const validate = (required, pattern) => {
		const rules = {
			required: required ? 'Required' : undefined,
			pattern: pattern
				? {
						value: pattern,
						message: 'Type correct value',
				  }
				: undefined,
		};
		return rules;
	};

	const onSubmit = ({ username, password, email }) => {
	registerUser({ username, password, email })
		navigate('/posts')
	};

	if(isError){
		return <p  className="sign-up__error">
			error.data.errors.error.message
		</p>
	}

	return (
		<div className="sign-up">
			<h5 className="sign-up__title">Create new account</h5>
			<div className="sign-up__form-wrapper">
				<form onSubmit={handleSubmit(onSubmit)} className="sign-up__form">
					Username
					<input
						autoComplete="on"
						className="sign-up__input"
						placeholder="Username"
						{...register('username', validate(true))}
					/>
					{errors?.username && (
          				<p className='sign-up__error'>{errors.username.message}</p>
        					)}
					Email address:
					<input
						autoComplete="on"
						className="sign-up__input"
						placeholder="E-mail"
						{...register('email', validate(true, patternEmail))}
					/>
				{errors?.email && (
          		<p className='sign-up__error'>{errors.email.message}</p>
        		)}
					Password:
					<input
						autoComplete="on"
						placeholder="Password"
						type="password"
						className="sign-up__input"
						{...register('password', {
							required: true,
							maxLength: 40,
							minLength: 6,
						})}
					/>
					{errors?.password && (
          		<p className='sign-up__error'>{errors.password.message}</p>
        		)}
					Repeat password:
					<input
						type="password"
						placeholder="Password"
						autoComplete="on"
						className="sign-up__input"
						{...register('confirm_password', {
							required: true,
							validate: (value) => {
								if (watch('password') !== value) {
									return "Passwords doesn't match";
								}
							},
						})}
					/>
						{errors?.confirm_password && (
          		<p className='sign-up__error'>{errors.confirm_password.message}</p>
        		)}
					<label htmlFor="agree_form" className="sign-up__agree-form">
						<input
							type="checkbox"
							name="agree-form"
							id="agree_form"
							className="sign-up__checkbox"
							{...register('agree_form', validate(true))}
						/>
						<div className="sign-up__agree-form">
							I agree to the processing of my personal information
						</div>
					</label>
					<ErrorMessage
						errors={errors}
						name="agree_form"
						render={(message) => (
							<p
								className="sign-in__error"
								style={{
									top: '0px',
								}}
							>
								{message.message}
							</p>
						)}
					/>
					{errors?.data && (
          <p className='sign-up__error'>{errors.data.message}</p>
        )}
					<button className="btn-on-submit" type="submit">
						Sign Up
					</button>
				</form>
			</div>
			<p className="sign-up__to-sign-in">
				Already have an account?
				<Link to="/sign-in" className="sign-up__link-to-sign-in">
					{' '}
					Sign in
				</Link>
			</p>
		</div>
	);
}
