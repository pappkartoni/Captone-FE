import { Col, Row } from "react-bootstrap"
import { Game } from "../../assets/interfaces/game"
import { useNavigate } from "react-router-dom"

const GameComponent = (props: {game: Game, even: Boolean}) => {
    const navigate = useNavigate()
    return (
        <div className="game-wrapper">
            <Row className={props.even ? "flex-row-reverse" : ""}>
                <Col xs={12} lg={4}>
                    <div className="img-wrapper" onClick={() => navigate(`/game/${props.game._id}`)}>
                        <img src={props.game.images.length > 0 ? props.game.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"} alt="game" />
                    </div>
                </Col>    
                <Col xs={12} lg={8}>
                    <div className="d-flex flex-column">
                        <p>Name: {props.game.name}</p>
                        <p>Description: {props.game.description}</p>
                        <p>Owner: {props.game.owner.name}</p>
                    </div>
                </Col>    
            </Row>
        </div>
    )
}

export default GameComponent