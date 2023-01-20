import { useState } from "react";
import {useDispatch} from "react-redux";
import {addComment} from "../../reducers/blogReducer";
import {setNotification} from "../../reducers/notificationReducer";
import {Button} from "react-bootstrap";

const Comments = ({ blog }) => {
    const [comments, setComments] = useState(blog.comments)
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch()

  const handleClick = (e) => {
      e.preventDefault()
      dispatch(addComment(blog.id, newComment))
      setComments(comments.concat(newComment))
      setNewComment('')
      dispatch(setNotification(`you added comment to ${blog.title}`, false, 5))
  }

  return (
    <div>
      <h3>comments</h3>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
          <Button onClick={handleClick}>add comment</Button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={blog.comments.indexOf(comment)}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments