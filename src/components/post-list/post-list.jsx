/* eslint-disable array-callback-return */
import React, { useState } from "react"
import { Pagination, Spin } from "antd"
import { useGetPostsQuery } from "../../api"
import Post from "../post/post"
import "./post-list.scss"

export default function PostList() {
  const [offset, setOffset] = useState(0)
  const token = localStorage.getItem("token")
  const { data = [], isLoading } = useGetPostsQuery({ offset, token })

  const onPaginationChange = (page) => {
    setOffset(page * 5 - 5)
  }

  const {articles} = data
  const totalArticles = data.articlesCount

  const postsToRender = []
  if (articles) {
    articles.map((post) => {
      postsToRender.push(
        <li key={post.slug} className='post'>
          <Post
            id={post.slug}
            key={post.slug}
            slug={post.slug}
            author={post.author}
            body={post.body}
            description={post.description}
            favorited={post.favorited}
            favoritesCount={post.favoritesCount}
            title={post.title}
            tagList={post.tagList}
            createdAt={post.createdAt}
          />
        </li>
      )
    })
  }
  if (isLoading) return <Spin size='large' className='post-list__spin' />
  return (
    <>
      <ul className='post-list'>{postsToRender}</ul>
      <Pagination
        className='post-list__pagination'
        onChange={onPaginationChange}
        showSizeChanger={false}
        total={totalArticles}
        pageSize={5}
      />
    </>
  )
}
