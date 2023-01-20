import {useDispatch} from "react-redux";
import {logout} from "../../reducers/authReducer";
import {Button} from "react-bootstrap";

const LogoutButton = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(logout())
    }

    return <Button variant="outline-danger" size="sm" onClick={handleClick}>logout</Button>
}

export default LogoutButton