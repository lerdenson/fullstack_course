const Notification = ({ message, isError }) => {
    if (message === null) return null

    const type = isError ? 'error' : 'notification'
    return (
        <div className={type}>{message}</div>
    )
}

export default Notification