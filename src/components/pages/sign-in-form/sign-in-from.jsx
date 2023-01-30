/* eslint-disable react/jsx-props-no-spreading */
import "./sign-in-form.scss"
import React, { useEffect } from "react"
import { ErrorMessage } from "@hookform/error-message"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Spin } from "antd"
import { onTokenAdd } from "../../../store/userSlice"
import { useLoginUserMutation } from "../../../api"


export default function SignInForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginUser, { data, isLoading }] = useLoginUserMutation()

  useEffect(() => {
    if (data) {
      const {token} = data.user
      const {username} = data.user
      const {image} = data.user
      const {password} = data.user
      const {email} = data.user
      localStorage.setItem("token", token)
      dispatch(onTokenAdd({ token, username, image, password, email }))
    }
  }, [data, dispatch])

  const patternEmail =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validate = (required, pattern) => {
    const rules = {
      required: required ? "Required" : undefined,
      pattern: pattern
        ? {
            value: pattern,
            message: "Type correct value",
          }
        : undefined,
    }
    return rules
  }
  if (isLoading) {
    return <Spin />
  }

  if (data) {
    navigate("/posts")
  }

  const onSubmit = ({ email, password }) => {
    loginUser({ email, password })
  }
  return (
    <div className='sign-in'>
      <h5 className='sign-in__title'>Sign In</h5>
      <div className='sign-in__form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className='sign-in__form'>
          Email address:
          <input
            autoComplete='on'
            placeholder='E-mail'
            className='sign-in__input'
            {...register("email", validate(true, patternEmail))}
          />
          <ErrorMessage
            errors={errors}
            name='email'
            render={(message) => (
              <p className='sign-in__error'>{message.message}</p>
            )}
          />
          Password:
          <input
            autoComplete='on'
            type='password'
            placeholder='Password'
            className='sign-in__input'
            {...register("password", validate(true))}
          />
          <ErrorMessage
            errors={errors}
            name='password'
            render={(message) => (
              <p className='sign-in__error'>{message.message}</p>
            )}
          />
          <button className='btn-on-submit' type='submit'>
            Login
          </button>
          <ErrorMessage
            errors={errors}
            name='data'
            render={() => (
              <p
                className='sign-in__error'
                style={{
                  left: "90px",
                  bottom: "10px",
                }}
              >
                Email or password is invalid
              </p>
            )}
          />
        </form>
      </div>
      <p className='sign-in__to-sign-up'>
        Don’t have an account?
        <Link to='/sign-up' className='sign-in__link-to-sign-up'>
          {" "}
          Sign up
        </Link>
      </p>
    </div>
  )
}
