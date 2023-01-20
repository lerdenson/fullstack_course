import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../reducers/authReducer";
import {setNotification} from "../../reducers/notificationReducer";
import {Button, Form} from "react-bootstrap";
import {useField} from "../../hooks/formHooks";

const LoginForm = () => {
    const dispatch = useDispatch();
    const message = useSelector((state) => state.currentUser.message);

    const username = useField("text")
    const password = useField("password")

    const handleLogin = async (event) => {
        event.preventDefault();

        dispatch(login(username.value, password.value));
    };

    useEffect(() => {
        if (message) {
            dispatch(setNotification(message.text, message.isError, 5));
        }
    }, [message]);

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group>
                <Form.Label>username: </Form.Label>
                <Form.Control
                    id="username"
                    {...username}
                />
                <Form.Label>password: </Form.Label>
                <Form.Control
                    id="password"
                    {...password}
                />
                <Button variant="primary" id="login-button" type="submit">
                    login
                </Button>
            </Form.Group>
        </Form>
    );
};

export default LoginForm