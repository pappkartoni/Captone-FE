import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { setUser } from "../../redux/reducers/userSlice"
import { useNavigate } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"


type Props = {
    setMaxDistance?: Dispatch<SetStateAction<number>>,
    setQuery?: Dispatch<SetStateAction<string>>,
    setLoggedIn?: Dispatch<SetStateAction<boolean>>
}
const Navi = (props: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)

    const logout = () => {
        dispatch(setUser({_id: "", name: "", avatar: "", email: "", trades: 0}))
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.clear()
        props.setLoggedIn?.(false)
        navigate("/")
    }


    return (
        <Navbar collapseOnSelect expand="lg" className="navi sticky-top">
        <Container>
            <Navbar.Brand href="/">BGE</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            {user.name.length > 0 && <Nav>
                <NavDropdown title={user.name.length ? user.name : "user"} id="collasible-nav-dropdown">
                    <NavDropdown.Item href={`/user/${user._id}`}>Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/owngames">Games</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/new">Add game</NavDropdown.Item>
                </NavDropdown>
            </Nav>}
            <Nav className="ms-auto">
                {(props.setMaxDistance && user.name.length > 0) && <><input className="navi-search" placeholder="Max distance in km..." type="number" onChange={(e) => props.setMaxDistance?.(e.target.value ? parseFloat(e.target.value) : 12345)}/></>}
                {props.setQuery && <input className="navi-search" placeholder="Search..." type="text" onChange={e => props.setQuery?.(e.target.value)}/>}
                {/* {localStorage.getItem("accessToken") && <Button onClick={() => navigate("/new")}>+</Button>} */}
                {localStorage.getItem("accessToken") ? <Button onClick={logout}>Log out</Button> : <Button onClick={() => navigate("/login")}>Log in</Button>}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
    }

export default Navi