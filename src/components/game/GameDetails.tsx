import { Button, Carousel, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

const GameDetails = () => {
    const id = useParams().id
    const game = useAppSelector(state => state.allGames.games.find(g => g._id === id))
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()
    const makeOffer = () => {
        navigate(`/offer/${id}`)
    }

    return (<Container className="mt-5">
        {game &&
            <Row>
                <Col md={12} lg={8}>
                <section>
                    <Carousel interval={null}>
                        {game.images.length > 0 ? game.images.map((image, i) => 
                            <Carousel.Item key={i}>
                                <div className="carousel-wrapper">
                                    <img src={image} alt={`im${i}`} />
                                </div>
                            </Carousel.Item>    
                        ) : <Carousel.Item><div className="carousel-wrapper">
                                <img src={"https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"} alt={`placeholder`} />
                            </div></Carousel.Item>}
                    </Carousel>
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <span>Valued at {game.asking}€ ± {game.variance}€</span>
                    {user._id !== game.owner._id ? <Button onClick={makeOffer}>Make an offer</Button> : <Button>Edit</Button>}
                </section>
                </Col>
                <Col md={12} lg={4}>
                    <section>
                        <h3>Owner</h3>
                        <p>{game.owner.name}</p>
                    </section>
                </Col>
            </Row>}
    </Container>)
}

export default GameDetails