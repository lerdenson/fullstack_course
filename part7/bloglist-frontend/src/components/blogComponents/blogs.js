import Togglable from "../togglable";
import BlogForm from "./blogForm";
import BlogList from "./bloglist";
import { useRef } from "react";

const Blogs = () => {
  const blogFormRef = useRef();
  return (
    <div>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default Blogs