import React from 'react';
import { Outlet } from 'react-router-dom';
import PostList from '../post-list/post-list';


import './main-page.scss';

export default function MainPage() {
	return (
		<div className="main-page">
			<PostList />
			<Outlet />
		</div>
	);
}
