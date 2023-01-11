const LogoutButton = (props) => {

    const handleClick = () => {
        window.localStorage.removeItem('loggedUser')
        props.setUser(null)
        props.setToken(null)
    }

    return <button onClick={handleClick}>logout</button>
}

export default LogoutButton