import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
    const [likes, setLikes] = useState(blog.likes)
    const [infoVisible, setInfoVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showDeleteButton = { display: (blog.user.username === user.username) ? '' : 'none' }

    const showWhenVisible = { display: infoVisible ? '' : 'none' }

    const onLikeButtonClick = (event) => {
        event.preventDefault()
        const changedBlog = {
            user: blog.user.id,
            likes: likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        updateBlog(blog.id, changedBlog)
        setLikes(likes + 1)
    }

    const onDeleteButtonClick = (event) => {
        event.preventDefault()
        deleteBlog(blog)
    }

    const getButtonLabel = () => {
        return infoVisible ? 'hide' : 'view'
    }


    return (
        <div style={blogStyle} className='blog'>
            {blog.title} {blog.author}
            <button className="view-button" onClick={() => setInfoVisible(!infoVisible)}>{getButtonLabel()}</button>
            <div style={showWhenVisible} className='blogInfo'>
                <p>{blog.url}</p>
                <p>
                    likes {likes}
                    <button className="like-button" onClick={onLikeButtonClick}>like</button>
                </p>
                <p>{blog.user.name}</p>
                <button className="delete-button" style={showDeleteButton} onClick={onDeleteButtonClick}>delete</button>
            </div>
        </div>
    )
}


export default Blog