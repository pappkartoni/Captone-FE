import { useEffect, useState } from "react"
import Navi from "./Navi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allGames, allOwnGames, getAllUsers, getUserData, recievedOffers, sentOffers } from "../../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import GameComponent from "./Game";
import Offers from "./Offers";

const MainPage = () => {
    const user = useAppSelector(state => state.user.user)
    const ownGames = useAppSelector(state => state.ownGames.games)
    const dispatch = useAppDispatch()
    const [loggedIn, setLoggedIn] = useState(false)
    //const [allGamess, setAllGamess] = useState<Game[]>([])
    const games = useAppSelector(state => state.allGames.games)
    const notOwnGames = games.filter(g => g.owner._id !== user._id)

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUserData())
            setLoggedIn(true)
            //getAllGames() //this happens before images are done
            dispatch(allGames())
            dispatch(allOwnGames())
            dispatch(sentOffers())
            dispatch(recievedOffers())
            dispatch(getAllUsers())
        } else {
            setLoggedIn(false)
        }
    },[dispatch])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        if (accessToken && refreshToken) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
            <Navi />
            <Container className="mt-5">
                <Row>
                    <Col xs={12} md={3}>
                        {loggedIn && <Offers />}
                    </Col>
                    <Col xs={12} md={6}>
                        <section>
                            <h1>New Games</h1>
                            {notOwnGames.length > 0 && notOwnGames.map(
                                (g,i) => <GameComponent key={g._id} game={g} even={i % 2 !== 0}/>
                            )}
                        </section>
                    </Col>
                    <Col xs={12} md={3}>
                        {loggedIn && <section>
                            <h3>Your Games</h3>
                            {ownGames.length > 0 ? 
                                ownGames.map(g => <p>{g.name}</p>)
                            : <p>No games yet</p>}
                        </section>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage