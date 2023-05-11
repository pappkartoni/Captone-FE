import { FormEvent, useState } from "react"
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import "../../assets/css/login.css"

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const login = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formValues)
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                localStorage.setItem("accessToken", data.accessToken)
                navigate("/")
            } else {
                setError(res.statusText)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login()
    }

    return (
        <section className="login-wrapper d-flex justify-content-center align-items-center">
            <Container className="login p-5">
                <Row>
                    {error.length > 0 && <Alert variant="danger">{error}</Alert>}
                    <Col lg={6} md={12}>
                        <Form onSubmit={handleSubmit} className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={formValues.email} onChange={e => setFormValues({...formValues, email: e.target.value})}></Form.Control> 
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={formValues.password} onChange={e => setFormValues({...formValues, password: e.target.value})}></Form.Control> 
                            </Form.Group>
                            <Button type="submit">Login</Button>
                        </Form>
                        <Link to={`${process.env.REACT_APP_BE_URL}/users/googlelogin`}>
                            <Button id="google-button">
                                <img
                                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                                    alt="Google logo"
                                    style={{ marginRight: "10px" }}
                                />
                                <span>Login with Google</span>
                            </Button>
                        </Link>
                        <p className="mt-3">New here? <Link to="/register">Register now</Link></p>
                    </Col>
                    <Col className="d-none col-lg-6 d-lg-block">
                        <div className="img-wrapper">
                            <img src="https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg" alt="logo"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Login