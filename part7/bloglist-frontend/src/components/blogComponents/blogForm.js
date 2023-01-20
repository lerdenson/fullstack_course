import {useDispatch} from "react-redux";
import {setNotification} from "../../reducers/notificationReducer";
import {createBlog} from "../../reducers/blogReducer";
import {Button, Form} from "react-bootstrap";
import {useField} from "../../hooks/formHooks";

const BlogForm = ({blogFormRef}) => {
    const dispatch = useDispatch();

    const title = useField("text")
    const author = useField("text")
    const url = useField("text")

    const handleSubmit = async (event) => {
        event.preventDefault();

        blogFormRef.current.toggleVisibility();
        dispatch(createBlog({title: title.value, author: author.value, url: url.value}));

        dispatch(
            setNotification(`a new blog ${title.value} by ${author.value} added`, false, 5)
        );
    };

    return (
        <div>
            <h3>create new</h3>

            <Form onSubmit={handleSubmit}>

                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        id="title-input"
                        {...title}
                    />
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        id="author-input"
                        {...author}
                    />
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        id="url-input"
                        {...url}
                    />
                    <Button variant="primary" type="submit" id="create-button">
                        create
                    </Button>
                </Form.Group>
            </Form>
        </div>

    );
};

export default BlogForm