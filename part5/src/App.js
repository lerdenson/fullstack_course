import { useState, useEffect, useRef } from 'react'
import BlogList from './components/blogComponents/bloglist'
import blogService from './services/blogs'
import BlogForm from './components/blogComponents/blogForm'

import LoginForm from './components/authComponents/loginForm'
import LogoutButton from './components/authComponents/logoutButton'
import Notification from './components/Notification'
import Togglable from './components/togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const blogFormRef = useRef()

    const showNotification = (isErr, msg) => {
        setIsError(isErr)
        setMessage(msg)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(newBlog))

    }

    const updateBlog = async (id, newBlog) => {
        const changedBlog = await blogService.update(id, newBlog)
        setBlogs(blogs.map(b => (b.id !== newBlog.id) ? b : changedBlog))
        console.log(changedBlog)
    }

    const deleteBlog = (blog) => {
        if (window.confirm(`delete ${blog.title} ?`)) {
            if (blog.user.username === user.username) {
                blogService.remove(blog.id)
                setBlogs(blogs.filter(b => b.id !== blog.id))
            }
        }
    }

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            {user === null ?
                <div>
                    <h2>log in to application</h2>
                    <Notification message={message} isError={isError}/>
                    <LoginForm
                        setUser={setUser}
                        showNotification={showNotification}
                    />
                </div>
                :
                <div>
                    <h2>blogs</h2>
                    <Notification message={message} isError={isError}/>
                    <div>{user.name} logged in
                        <LogoutButton setUser={setUser} setToken={blogService.setToken}/>
                    </div>
                    <Togglable buttonLabel='create blog' ref={blogFormRef}>
                        <BlogForm
                            showNotification={showNotification}
                            addBlog={addBlog}
                        />
                    </Togglable>
                    <BlogList blogs={blogs} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
                </div>
            }
        </div>
    )
}

export default App
