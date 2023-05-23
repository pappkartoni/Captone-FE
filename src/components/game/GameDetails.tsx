import { Button, Carousel, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import Navi from "../main/Navi"
import { useEffect, useState } from "react"

const GameDetails = () => {
    const id = useParams().id
    const game = useAppSelector(state => state.allGames.games.find(g => g._id === id))
    const user = useAppSelector(state => state.user.user)
    const navigate = useNavigate()
    const [imgWidth, setImgWidth] = useState(856)
    const makeOffer = () => {
        navigate(`/offer/${id}`)
    }

    const resizeCar = () => {
        const gameInfoContainer = document.querySelector(".game-info")
            if (gameInfoContainer) {
                const firstImg = document.querySelector(".carousel-item")
                if (firstImg) setImgWidth(gameInfoContainer.clientWidth)
            }
    }
    useEffect(() => {
        resizeCar()
        window.addEventListener("resize", resizeCar)
    }, [])
    return (
        <>
            <Navi />
            <Container className="mt-5 mb-4">
                {game &&
                <Row>
                    <Col md={12} lg={8}>
                        <section className="game-info">
                            <h2>{game.name}</h2>
                            <Carousel interval={null} className="bla" style={{height: `${imgWidth}px`}}>
                                {game.images.length > 0 ? game.images.map((image, i) => 
                                    <Carousel.Item key={i}>
                                        <div className="carousel-wrapper">
                                            <img src={image} alt={`im${i}`}/>
                                        </div>
                                    </Carousel.Item>    
                                ) : <Carousel.Item><div className="carousel-wrapper">
                                        <img src={"https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"} alt={`placeholder`} />
                                    </div></Carousel.Item>}
                            </Carousel>
                            <div className="game-details">
                                <h5 className="mt-2">About this game:</h5>
                                <p className="description">{game.description}</p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="value">Valued at {game.asking}€ ± {game.variance}€</span>
                                    {user._id && (user._id !== game.owner._id ? <Button onClick={makeOffer}>Make an offer</Button> : <Button onClick={() => navigate(`/game/${game._id}/edit`)}>Edit</Button>)}
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={12} lg={4}>
                        <section className="owner-info">
                            <h3>Owner</h3>
                            <h4 onClick={() => navigate(`/user/${game.owner._id}`)}>{game.owner.name}</h4>
                            <div className="img-wrapper">
                                <img onClick={() => navigate(`/user/${game.owner._id}`)} src={game.owner.avatar ? game.owner.avatar : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1684410749/bge/avatars/akdxcfi1jy7gfemhvj3j.jpg"} alt="avatar" />                                
                            </div>
                            <h6>About:</h6>
                            <p>{game.owner.about ? game.owner.about : "No info about this user"}</p>
                            <h6>Trades: {game.owner.trades}</h6>
                        </section>
                    </Col>
                </Row>}
            </Container>
        </>
    )
}

export default GameDetails