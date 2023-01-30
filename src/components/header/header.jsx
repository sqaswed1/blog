import React from 'react';
import { Avatar, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { onDeleteToken } from '../../store/userSlice';
import { useGetLoggedUserQuery } from '../../api';

import './header.scss';

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = localStorage.getItem('token');
	const { data: loggedData, isLoading } = useGetLoggedUserQuery(token);
	const info = useSelector((state) => state.userSlice);

	if (isLoading) {
		return <Spin />;
	}
	const clearStorage = () => {
		dispatch(onDeleteToken());
		localStorage.removeItem('token');
		navigate('/posts');
	};

	return (
		<div className="header">
			<Link to="/posts" className="header__title">
				<h1>Realworld Blog</h1>
			</Link>
			{!token ? (
				<div className="header__btn-login-group">
					<Link to="/sign-in">
						<button type='button' className="btn btn-sign-in">Sign in</button>
					</Link>
					<Link to="sign-up" className="btn">
						{' '}
						<button  type='button' className="btn btn-sign-up">Sign up</button>
					</Link>
				</div>
			) : (
				<div className="header__userinfo">
					<Link to="/new-article">
						<button  type='button'  className="btn btn-article-create">Create article</button>
					</Link>
					<Link to="/profile" className="header__link-to-profile">
						<span className="header__userinfo-username">
							{info.username || loggedData.user.username}
						</span>
						<Avatar
							size={46}
							className="header__user-avatar"
							src={info.image || loggedData.user.image}
						/>
					</Link>
						<button  type='button'  className="btn btn-log-out" onClick={clearStorage}>
							Log out
						</button>
				</div>
			)}
		</div>
	);
}
