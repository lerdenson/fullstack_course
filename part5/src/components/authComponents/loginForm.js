import loginService from '../../services/login'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )

            props.setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            props.showNotification(true, exception.response.data.error)
        }
    }


    return <form onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
                type="password"
                id="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button id="login-button" type="submit">login</button>
    </form>
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default LoginForm