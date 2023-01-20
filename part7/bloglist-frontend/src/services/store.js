import {configureStore} from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import authReducer from "../reducers/authReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        notification: notificationReducer,
        currentUser: authReducer,
        users: usersReducer
    },
});

export default store