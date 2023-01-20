import LogoutButton from "./authComponents/logoutButton";
import {useSelector} from "react-redux";
import {Nav, Navbar} from "react-bootstrap";

const Menu = () => {
    const user = useSelector((state) => state.currentUser.user);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Blogs</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link as="span">
                        {user.name} <LogoutButton/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Menu