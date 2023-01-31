/* eslint-disable no-constant-condition */
/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React,  { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { UserOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { Tag, Avatar, Spin } from 'antd';


import './post-page.scss';

import {
	useGetLoggedUserQuery,
	useDeleteArticleMutation,
	useSetFavoritedMutation,
	useGetOnePostQuery,
} from '../../../api';

export default function PostPage() {
	const navigate = useNavigate();
	const { slug } = useParams();
	const [setLiked] = useSetFavoritedMutation();

	const [isModalShow, setIsModalShow] = useState(false);
	const token = localStorage.getItem('token');
	const { data: loggedData } = useGetLoggedUserQuery(token);
	const [deleteArticle] = useDeleteArticleMutation();

	const onDeleteClick = () => {
		setIsModalShow(!isModalShow);
	};

	const onDeleteArticle = () => {
		deleteArticle({ slug, token });
		navigate(`/posts`);
	};
	const { data, isLoading } = useGetOnePostQuery({ slug, token });
	const setLike = ({ method }) => {
		setLiked({ slug, token, method });
	};

	if (isLoading) {
		return <Spin size="large" style={{}} />;
	}
	if (data) {
		const {
			title,
			body,
			createdAt,
			favorited,
			description,
			favoritesCount,
			tagList,
			author,
		} = data.article;
		const { username, image } = author;
		return (
			<div className="post-page">
				<div className="post-page__info">
					<div className="post-page__info-wrapper">
						<h5 className="post-page__info-title">
							{title.length > 35 ? `${title.substr(0, 35)}...` : title}
						</h5>
						<div className="post-page__info-favorited">
							{favorited ? (
								<HeartTwoTone
									onClick={() => setLike({ slug, token, method: 'DELETE' })}
									twoToneColor="#eb2f96"
								/>
							) : (
								<HeartOutlined
									onClick={() => setLike({ slug, token, method: 'POST' })}
								/>
							)}
							{favoritesCount}
						</div>
					</div>

					<span className="post-page__info-tagList">
						{tagList.map((tag) => 
							 
								<Tag key={nanoid()}>
									{null
										? []
										: tag.length > 15
										? `${tag.substr(0, 15)}...`
										: tag}
								</Tag>
	)
						}
					</span>
					<p className="post-page__info-description">
						<ReactMarkdown><p>{description}</p></ReactMarkdown>
					</p>
					<p className="post-page__info-body">
						<ReactMarkdown>{body}</ReactMarkdown>
					</p>
				</div>
				<div className="post-page__user-info">
					<div className="post-page__user-info-wrapper">
						<span className="post-page__creater">{username}</span>
						<span className="post-page__createdTime">
							{format(new Date(createdAt), 'MMMM do, yyyy')}
						</span>
					</div>

					<Avatar
						size={46}
						src={image}
						alt="userphoto"
						className="post-page__creater-pic"
						icon={<UserOutlined />}
					/>
					{username === loggedData?.user?.username ? (
						<div className="post-page__button-wrapper">
							<button type='button'
								className="post-page__btn-delete-post btn"
								onClick={onDeleteClick}
							>
								Delete
							</button>
							{isModalShow ? (
								<div className="post-page__modal-on-delete">
									Are you sure to delete this article?
									<div className="post-page__modal-button-wrapper">
										<button   type='button'className=" btn-on-agree" onClick={onDeleteArticle}>
											Yes
										</button>
										<button   type='button' className=" btn-on-disagree">No</button>
									</div>
								</div>
							) : undefined}
							<button  type='button'
								className="post-page__btn-edit-post btn"
								onClick={() => navigate(`/post/${slug}/edit`)}
							>
								Edit
							</button>
						</div>
					) : (
						<div/>
					)}
				</div>
			</div>
		);
	}
}
