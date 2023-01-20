import Notification from "./Notification";
import Menu from "./Menu";
import { Route, Routes, useMatch } from "react-router-dom";
import Blogs from "./blogComponents/blogs";
import Users from "./userComponents/users";
import User from "./userComponents/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../reducers/usersReducer";
import { initializeBlogs } from "../reducers/blogReducer";
import { getUserFromBrowser } from "../reducers/authReducer";
import Blog from "./blogComponents/Blog";

const Content = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);



  useEffect(() => {
    dispatch(getUsers());
  }, [blogs]);

  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Menu />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default Content;