import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { FormEvent, useEffect, useState } from "react"
import { Game } from "../../redux/interface"
import { allGames, editGameWithImages } from "../../redux/actions"

const GameEdit = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const game = useAppSelector(state => state.ownGames.games).find(g => g._id === id)
    const [edit, setEdit] = useState({
        name: "",
        description: "",
        asking: 0,
        variance: 0,
        images: [] as string[]
    })
    const [images, setImages] = useState<FileList | null>(null)

    const handleSubmit = (e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            dispatch(editGameWithImages({_id: id, data: edit, images: images}))
            dispatch(allGames())
            navigate(`/`)
        }
    }
    useEffect(() => {
        if (game) setEdit(game) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {edit && <>
                <Container className="mt-5 edit-game">
                    <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} lg={8}>
                        <section>
                            <h2>Edit Game</h2>
                            <Form.Group>
                                <Form.Label>What's it called?</Form.Label>
                                <Form.Control type="text" value={edit.name} placeholder="Add a name for the game"
                                    onChange={(e) => setEdit({...edit, name: e.target.value})}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Describe it (condition, extras etc.)</Form.Label>
                                <Form.Control as="textarea" value={edit.description} placeholder="Add a description"
                                    onChange={(e) => setEdit({...edit, description: e.target.value})}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>How do you value it?</Form.Label>
                                <Form.Control type="number" value={edit.asking} placeholder="Add an estimate"
                                    onChange={(e) => setEdit({...edit, asking: parseFloat(e.target.value)})}
                                    />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Variance</Form.Label>
                                <Form.Control type="number" value={edit.variance} placeholder="Add a variance"
                                    onChange={(e) => setEdit({...edit, variance: parseFloat(e.target.value)})}
                                    />
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                        </section>
                        </Col>
                        <Col xs={12} lg={4}>
                            <section className="edit-images">
                                <h2>Images</h2>
                                <div className="d-flex">
                                    {edit.images.length > 0 ? edit.images.map((im, i) => <img key={i} src={im} alt="" onClick={(e: any) => setEdit({...edit, images: edit.images.filter(im => im !== e.target.src)}) }/>)
                                    : <p>No images</p>}
                                </div>
                                <Form.Group>
                                        <Form.Label>Add additional images</Form.Label>
                                        <Form.Control className="im-upload" type="file" accept="image/*" multiple
                                            onChange={(e: any) => setImages(e.target.files)}
                                            />
                                </Form.Group>
                            </section>
                        </Col>
                    </Row>
                </Form>
                </Container>
            </>}
        </>
    )
}

export default GameEdit