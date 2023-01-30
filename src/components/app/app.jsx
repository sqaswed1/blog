import React from "react"
import { Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import MainPage from "../mainPage/main-page"
import store from "../../store/store"
import Header from "../header/header"
import SignInForm from "../pages/sign-in-form/sign-in-from"
import PostPage from "../pages/post-page/post-page"
import SignUpForm from "../pages/sign-up-form/sign-up-form"
import Profile from "../pages/profile/profile"
import ArticleForm from "../pages/article-form/article-form"

import "./app.scss"

export default function App() {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/post/:slug' element={<PostPage />} />
        <Route path='/posts' element={<MainPage />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/new-article' element={<ArticleForm />} />
        <Route path='/post/:slug/edit' element={<ArticleForm />} />
      </Routes>
    </Provider>
  )
}
