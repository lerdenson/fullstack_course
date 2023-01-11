import { useState } from 'react'

const BlogForm = ({
    showNotification,
    addBlog
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        addBlog({ title, author, url })

        showNotification(false, `a new blog ${title} by ${author} added`)
    }

    return <form onSubmit={handleSubmit}>
        <h3>create new</h3>
        <div>
            title:
            <input
                type="text"
                id="title-input"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author:
            <input
                type="text"
                id="author-input"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url:
            <input
                type="text"
                id="url-input"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />
        </div>

        <button id="create-button" type="submit">create</button>
    </form>
}

export default BlogForm