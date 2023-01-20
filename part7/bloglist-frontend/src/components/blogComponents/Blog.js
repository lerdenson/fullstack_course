import {deleteBlog, updateBlog} from "../../reducers/blogReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Comments from "./comments";
import {Button} from "react-bootstrap";

const Blog = ({blog}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.currentUser.user);

    const onLikeButtonClick = () => {
        const changedBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        };
        dispatch(updateBlog(blog.id, changedBlog));
        console.log(blog);
    };

    const onDeleteButtonClick = (event) => {
        event.preventDefault();
        if (window.confirm(`delete ${blog.title} ?`)) {
            if (blog.user.username.username === user.username) {
                dispatch(deleteBlog(blog.id));
                navigate("/");
            }
        }
    };

    if (!blog) return null;

    const showDeleteButton = {
        display: blog.user.username === user.username ? "" : "none",
    };

    return (
        <div className="blog">
            <h2>
                {blog.title} {blog.author}
            </h2>
            <div>{blog.url}</div>
            <div>
                likes {blog.likes}{" "}
                <Button
                    className="like-button"
                    onClick={onLikeButtonClick}
                    variant={"outline-primary"}
                    size="sm"
                >
                    like
                </Button>
            </div>
            <div>added by {blog.user.name}</div>
            <Button
                className="delete-button"
                style={showDeleteButton}
                variant="outline-danger"
                onClick={onDeleteButtonClick}
            >
                delete
            </Button>
            <Comments blog={blog}/>
        </div>
    );
};


export default Blog