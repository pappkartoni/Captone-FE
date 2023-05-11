import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useAppDispatch } from "../../redux/hooks"
import { setUser } from "../../redux/reducers/userSlice"
import { useNavigate } from "react-router-dom"

const Navi = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(setUser({_id: "", name: "", avatar: "", email: ""}))
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        //navigate("/login")
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="navi sticky-top">
        <Container>
            <Navbar.Brand href="#home">BGE</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                {localStorage.getItem("accessToken") && <Button onClick={() => navigate("/new")}>+</Button>}
                {localStorage.getItem("accessToken") ? <Button onClick={logout}>Log out</Button> : <Button onClick={() => navigate("login")}>Log in</Button>}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
    }

export default Navi