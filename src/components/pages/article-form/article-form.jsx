/* eslint-disable react/jsx-props-no-spreading */
import "./article-form.scss"
import React, {useEffect} from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { ErrorMessage } from "@hookform/error-message"
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetOnePostQuery,
} from "../../../api"

export default function ArticleForm() {
  const [createArticle, { data }] = useCreateArticleMutation()
  const [updateArticle] = useUpdateArticleMutation()
  const slug1 = useParams()
  const {slug} = slug1
  const token = localStorage.getItem('token')
  const { data: postData } = useGetOnePostQuery({slug, token})

  let isEditing = false
  if (slug) {
    isEditing = true
  }

  const defaultValues = (isEditing, postData)
    ? {
        description: postData.article.description,
        body: postData.article.body,
        tags: postData.article.tagList.map((el) => ({ tag: el })),
        title: postData.article.title,
      }
    : undefined

  const navigate = useNavigate()

  const tagList = []

  useEffect(() => {
    if (data) {
      tagList.push(tagList)
    }
  }, [data])

  if (data) {
    navigate(`/posts`)
  }



  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  })

  const onSubmit = ({ title, body, description, tags }) => {
    tags.map((tag) => tagList.push(tag.tag))
    const articleInfo = { title, body, description, tagList }
    if (slug) {
      updateArticle({ articleInfo, token, slug })
    } else createArticle({ articleInfo, token })
    navigate('/posts')
  }

  return (
    <div className='create-article__form-wrapper'>
      <div className='create-article'>
        {slug ? (
          <h5 className='create-article__title'>Edit article</h5>
        ) : (
          <h5 className='create-article__title'>Create new article</h5>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='create-article__form'
        >
          Title
          <input
            autoComplete='on'
            className='create-article__input'
            placeholder='Title'
            {...register("title", { required: true })}
          />
          <ErrorMessage
            errors={errors}
            className='create-article__error'
            name='title'
            render={() => <p className='create-article__error'>Required</p>}
          />
          Short description
          <input
            autoComplete='on'
            className='create-article__input'
            placeholder='Description'
            {...register("description", { required: true })}
          />
          <ErrorMessage
            errors={errors}
            className='create-article__error'
            name='description'
            render={() => <p className='create-article__error'>Required</p>}
          />
          Text
          <textarea
            autoComplete='on'
            className='create-article__input create-article__input-body'
            placeholder='Text'
            {...register("body", { required: true })}
          />
          <ErrorMessage
            errors={errors}
            name='body'
            render={() => <p className='create-article__error'>Required</p>}
          />
          Tags
          <ul className='create-article__tagList'>
            {fields.map((field, ind) => (
              <li key={field.id}>
                <input
                  className='create-article__input-tag'
                  {...register(`tags.${ind}.tag`, { required: true })}
                />

                <ErrorMessage
                  errors={errors}
                  className='create-article__error'
                  name='tags'
                  render={() => (
                    <p className='create-article__error'>Required</p>
                  )}
                />
                <button type='button' 
                  className='create-article__btn-delete-tag'
                  onClick={() => {
                    remove(ind)
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <input
            type='button'
            value='Add tag'
            className='create-article__btn-add-tag'
            onClick={() => append({ tag: " " })}
          />
          <button className='btn-on-submit' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
