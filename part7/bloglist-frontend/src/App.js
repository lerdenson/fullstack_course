import LoginForm from "./components/authComponents/loginForm";
import Notification from "./components/Notification";
import {useDispatch, useSelector} from "react-redux";

import {BrowserRouter as Router} from "react-router-dom";
import Content from "./components/content";
import {useEffect} from "react";
import {initializeBlogs} from "./reducers/blogReducer";
import {getUserFromBrowser} from "./reducers/authReducer";

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.currentUser.user);

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(getUserFromBrowser());
    }, [dispatch]);

    return (
        <div className="container" >
            {user === null ? (
                <div>
                    <h2>log in to application</h2>
                    <Notification/>
                    <LoginForm/>
                </div>
            ) : (
                <Router>
                    <Content/>
                </Router>
            )}
        </div>
    );
};

export default App
