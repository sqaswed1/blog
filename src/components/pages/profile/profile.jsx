/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

import { Spin } from "antd"
import { useDispatch } from "react-redux"
import { useUpdateUserMutation, useGetLoggedUserQuery } from "../../../api"
import { onChangeInfo } from "../../../store/userSlice"

import "./profile.scss"

export default function Profile() {
  const dispatch = useDispatch()
  const patternEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const patternImage = /([a-z\-_0-9/:.]*\.(jpg|jpeg|png|gif))/i

  const [updateUser, { data, isLoading, error }] = useUpdateUserMutation()
  const token = localStorage.getItem('token')
  const {data: dataUser}= useGetLoggedUserQuery(token)
 
  const validate = (required, pattern, min, max) => {
    const rules = {
      required: required ? "Required" : undefined,
      pattern: pattern
        ? {
            value: pattern,
            message: "Type correct value",
          }
        : undefined,
      min: min
        ? {
            value: min,
            message: `Minimum length is ${min} symbols`,
          }
        : undefined,
      max: max
        ? {
            value: max,
            message: `Maximum length is ${max} symbols`,
          }
        : undefined,
    }
    return rules
  }
 
  const defaultValues = (dataUser)
  ? {
    username:  dataUser.user.username,
    image: dataUser.user.image,
    password: dataUser.user.password,
    email:dataUser.user.email
    }
  : undefined

  useEffect(() => {
    if (data) {
      const {username} = data.user
      const {image} = data.user
      const {password} = data.user
      const {email} = data.user
      dispatch(onChangeInfo({ username, image, password, email }))
    }
  }, [data, dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
    defaultValues,
  })

  const onSave = (dataInfo) => {
   updateUser({token, dataInfo})
  }

  return (
    <div className='profile'>
      <h5 className='profile__title'>Edit profile</h5>
      <form onSubmit={handleSubmit(onSave)} className='profile__form'>
        Username
        <input
          type='text'
          name='username'
          id='username'
          className='profile__input'
          placeholder='Username'
          {...register("username", validate(true, /^[a-z0-9]*$/, 3, 20))}
        />
        {errors?.username && (
          <p className='edit-profile_error'>{errors.username.message}</p>
        )}
        {error?.data.errors.username && (
          <p className='sign-in_error'>Username {error.data.errors.username}</p>
        )}
        Email addres
        <input
          type='text'
          id='email'
          placeholder='Email addres'
          className='profile__input'
          {...register("email", validate(true, patternEmail))}
        />
        {errors?.email && (
          <p className='edit-profile_error'>{errors.email.message}</p>
        )}
        {error?.data.errors.email && (
          <p className='sign-in_error'>Email {error.data.errors.email}</p>
        )}
        New password
        <input
          type='password'
          id='password'
          className='profile__input'
          placeholder='New password'
          {...register("password", validate(false, false, 6, 40))}
        />
        {errors?.password && (
          <p className='edit-profile_error'>{errors.password.message}</p>
        )}
        Avatar image (url)
        <input
          type='text'
          id='image'
          placeholder='Avatar image'
          className='profile__input'
          {...register("image", validate(false, patternImage))}
        />
        {errors?.image && (
          <p className='edit-profile_error'>{errors.image.message}</p>
        )}
        {isLoading && <Spin />}
        <button className='btn-on-submit' onSubmit={onSave} type='submit'>
          Save
        </button>
      </form>
    </div>
  )
}
