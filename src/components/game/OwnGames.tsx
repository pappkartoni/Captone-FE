import { Col, Container, Row } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import Navi from "../main/Navi"
import Game from "../main/Game"
import { useParams } from "react-router-dom"
import GameComponent from "../main/Game"

const OwnGames = () => {
    const ownGames = useAppSelector(state => state.ownGames.games)
    return (
        <>
            <Navi />
            <Container className="mt-5">
                <Row className="justify-content-center">
                <Col xs={12} md={6}>
                        <section className="new-games">
                            <h1>Your Games</h1>
                            {ownGames.length > 0 ? ownGames.map(
                                (g,i) => <GameComponent key={g._id} game={g} even={i % 2 === 0}/>
                            )
                            : <p>No results</p>
                            }
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OwnGames