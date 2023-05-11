import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Navi from "../main/Navi"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { FormEvent, useState } from "react"
import { newGameWithImages } from "../../redux/actions"

const NewGame = () => {
    const dispatch = useAppDispatch()
    const navigate= useNavigate()
    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        asking: 0,
        variance: 0,
    })
    const [images, setImages] = useState<FileList | null>(null)

    const handleSubmit = (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(newGame)
        console.log(images)
        if (images)
        dispatch(newGameWithImages({data: newGame, images: images}))
        navigate("/")
    }
    return (
        <>
            <Navi />
            <Container className="mt-5">
            <section className="p-3">
                <Row className="justify-content-center">
                    <Col xs={12} lg={6}>
                        <h2>New Offer</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={newGame.name} placeholder="Add a name for the game"
                                    onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="textarea" value={newGame.description} placeholder="Add a description"
                                    onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Asking</Form.Label>
                                <Form.Control type="number" value={newGame.asking} placeholder="Add an estimate"
                                    onChange={(e) => setNewGame({...newGame, asking: parseFloat(e.target.value)})}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Variance</Form.Label>
                                <Form.Control type="number" value={newGame.variance} placeholder="Add a variance"
                                    onChange={(e) => setNewGame({...newGame, variance: parseFloat(e.target.value)})}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Pictures</Form.Label>
                                <Form.Control className="im-upload" type="file" accept="image/*" multiple
                                    onChange={(e: any) => setImages(e.target.files)}
                                    />
                            </Form.Group>
                        <Button type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </section>
            </Container>
        </>
    )
}

export default NewGame