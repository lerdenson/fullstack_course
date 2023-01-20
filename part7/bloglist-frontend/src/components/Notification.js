import {useSelector} from "react-redux";
import {Alert} from "react-bootstrap";

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    return <Alert variant={notification.variant} style={notification.style}>{notification.message}</Alert>;
};

export default Notification