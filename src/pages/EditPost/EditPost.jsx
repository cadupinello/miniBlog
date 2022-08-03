import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './EditPost.module.css'

// hooks
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)
  const { user } = useAuthValue()
  const {updateDocument, response} = useUpdateDocument("posts")

  console.log(post)

  const navigate = useNavigate()

  // fill data form 
  useEffect(() => {
    if(post) {
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")

      setTags(textTags)
    }
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    // validate image Url
    try {
      new URL(image)

    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }

    // criar o array de Tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // checar todos os valores 
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }
    if (formError) return

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
    });

    const data = {
      title,
      image,
      tagsArray,
      body,
    }

    updateDocument(id, data)

    // redirect to home page
    navigate("/dashboard")
  }


  return (
    <>
      <div className={styles.edit_post}>
        {post && (
          <>
            <h2>Editando post: {post.title}</h2>
            <p>Altere os dados do post como desejar !</p>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título: </span>
                <input
                  type="text"
                  name='title'
                  required
                  placeholder='Pense num bom título...'
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label>
                <span>Url da imagem: </span>
                <input
                  type="text"
                  name='image'
                  required
                  placeholder='Insira sua imagem que representa o seu post'
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                />
              </label>
              <label>
                <span>Conteúdo: </span>
                <textarea
                  name='body'
                  required
                  placeholder='Insira o contéudo do post'
                  onChange={(e) => setBody(e.target.value)}
                  value={body}
                ></textarea>
              </label>
              <label>
                <span>Tags: </span>
                <input
                  type="text"
                  name='tags'
                  required
                  placeholder='Insira as tags separadas por vírgula'
                  onChange={(e) => setTags(e.target.value)}
                  value={tags}
                />
              </label>
              {!response.loading &&
                <button className='btn'>Editar</button>
              }
              {response.loading && (
                <button className='btn' disabled>Aguarde ...</button>
              )}
              {response.error || formError && (
                <p className='error'>{response.error || formError}</p>
              )}
            
            </form>
          </>
        )}
        
      </div>
    </>
  )
}

export default EditPost