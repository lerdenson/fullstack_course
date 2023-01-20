import {useSelector} from "react-redux";
import {ListGroup} from "react-bootstrap";

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
        <ListGroup>
            {sortedBlogs.map((blog) => (
                <ListGroup.Item key={blog.id} action href={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default BlogList