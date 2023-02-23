import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../services/queries";

const LoginForm = ({setToken, show}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            // setError(error.graphQLErrors[0].message)
            console.log(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.token;
            setToken(token);
            const genre = result.data.login.favouriteGenre;
            localStorage.setItem("userToken", token);
            localStorage.setItem("favouriteGenre", genre);
        }
    }, [result.data]);

    const submit = async (event) => {
        event.preventDefault();

        await login({variables: {username, password}});
    };

    if (!show) return null;

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username{" "}
                    <input
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password{" "}
                    <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm