import { Col, Row } from "react-bootstrap"
import { Game } from "../../assets/interfaces/game"
import { useNavigate } from "react-router-dom"

const GameComponent = (props: {game: Game, even: Boolean}) => {
    const navigate = useNavigate()
    return (
        <div className={`game-wrapper ${props.even ? "left" : "right"}`} onClick={() => navigate(`/game/${props.game._id}`)}>
            <Row className={props.even ? "" : "flex-row-reverse"}>
                <Col xs={12} lg={4}>
                    <div className="img-wrapper">
                        <img src={props.game.images.length > 0 ? props.game.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"} alt="game" />
                    </div>
                </Col>    
                <Col className="game-info" xs={12} lg={8}>
                    <div className="d-flex flex-column h-100 p-2">
                        <h4>{props.game.name}</h4>
                        <p>{props.game.description.substring(0,50)}{props.game.description.length > 50 && "..."}</p>
                        <p  className="owner">Owner: {props.game.owner.name}</p>
                    </div>
                </Col>    
            </Row>
        </div>
    )
}

export default GameComponent