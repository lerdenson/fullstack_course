import Blog from './Blog'

const BlogList = (props) => {
    return (
        <div>
            {props.blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={props.user}
                        updateBlog={props.updateBlog}
                        deleteBlog={props.deleteBlog}
                    />
                )}
        </div>
    )
}

export default BlogList