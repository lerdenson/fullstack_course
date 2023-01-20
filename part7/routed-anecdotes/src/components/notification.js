const Notification = ({ notification }) => {
    return <div style={notification.style}>
        {notification.msg}
    </div>

}

export default Notification