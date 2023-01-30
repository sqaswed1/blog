/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Tag, Avatar } from "antd"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { format } from "date-fns"
import { UserOutlined, HeartOutlined, HeartTwoTone } from "@ant-design/icons"
import { nanoid } from "nanoid"
import { useSetFavoritedMutation } from "../../api"

import "./post.scss"

export default function Post({
  slug,
  author,
  description,
  favorited,
  favoritesCount,
  title,
  id,
  tagList,
  createdAt,
}) {
  const [setLiked] = useSetFavoritedMutation()
  const { username, image } = author
  const token = localStorage.getItem("token")

  const setLike = ({method }) => {
    setLiked({ slug, token, method })
  }

  return (
    <div className='post' key={id}>
      <div className='post__info'>
        <div className='post__info-wrapper'>
          <Link to={`/post/${slug}`} style={{ textDecoration: "none" }}>
            <h5 className='post__info-title'>
              {title.length > 35 ? `${title.substr(0, 35)}...` : title}
            </h5>
          </Link>
          <div className='post__info-favorited'>
            {favorited ? (
              <HeartTwoTone
                onClick={() => setLike({ slug, token, method: "DELETE" })}
                twoToneColor='#eb2f96'
              />
            ) : (
              <HeartOutlined
                onClick={() => setLike({ slug, token, method: "POST" })}
              />
            )}
            {favoritesCount}
          </div>
        </div>
        <span className='post__info-tagList'>
          {tagList.map((tag) => {
            if (tag)
              return (
                <Tag key={nanoid()}>
                  {tag.length > 15 ? `${tag.substr(0, 15)}...` : tag}
                </Tag>
              )
          })}
        </span>
        <p className='post__info-description'>{description}</p>
      </div>
      <div className='post__user-info'>
        <span className='post__creater'>{username}</span>
        <Avatar
          size={46}
          src={image}
          alt='userphoto'
          className='post__creater-pic'
          icon={<UserOutlined />}
        />
        <span className='post__createdTime'>
          {format(new Date(createdAt), "MMMM do, yyyy")}
        </span>
      </div>
    </div>
  )
}
Post.propTypes = {
  slug: PropTypes.string, 
  author: PropTypes.instanceOf(Object)  ,
  description: PropTypes.string,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.string,
  tagList: PropTypes.instanceOf(Array),
  createdAt: PropTypes.string,


};