import { useEffect, useState } from "react"
import Navi from "./Navi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allGames, allOwnGames, getAllUsers, getUserData, recievedOffers, sentOffers } from "../../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import GameComponent from "./Game";
import Offers from "./Offers";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const user = useAppSelector(state => state.user.user)
    const ownGames = useAppSelector(state => state.ownGames.games)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    //const [allGamess, setAllGamess] = useState<Game[]>([])
    const games = useAppSelector(state => state.allGames.games)
    const notOwnGames = games.filter(g => g.owner._id !== user._id)

    const [maxDistance, setMaxDistance] = useState(500)
    const [query, setQuery] = useState("")
    
    const deg2rad = (num: number) => num * (Math.PI / 180)

    const calculateDistance = (loc1: {lat: number | undefined, lon: number | undefined}, loc2: {lat: number | undefined, lon: number | undefined}) => {
        if (loc1.lat && loc2.lat && loc1.lon && loc2.lon) {
            const a = deg2rad(loc1.lat)
            const b = deg2rad(loc2.lat)
            const x = deg2rad(loc1.lon)
            const y = deg2rad(loc2.lon)

            return 6371 * Math.acos(Math.sin(a)*Math.sin(b) + Math.cos(a)*Math.cos(b)*Math.cos(x-y))
        } else return 0
    } // fix this shit
        
    const matchingGames = notOwnGames.filter(g => (g.name.toLowerCase().includes(query.toLowerCase()) || g.description.toLowerCase().includes(query.toLowerCase())) && calculateDistance({lat: user.location?.lat, lon: user.location?.lon}, {lat: g.owner.location?.lat, lon: g.owner.location?.lon}) <= maxDistance)
    
    useEffect(() => {
        dispatch(allGames())
        dispatch(getAllUsers())
        if (localStorage.getItem("accessToken")) {
            console.log("we are in here")
            dispatch(getUserData())
            setLoggedIn(true)
            dispatch(allOwnGames())
            dispatch(sentOffers())
            dispatch(recievedOffers())
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
          dispatch(getUserData())
          setLoggedIn(true)
          dispatch(allOwnGames())
          dispatch(sentOffers())
          dispatch(recievedOffers())
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <>
            <Navi setMaxDistance={setMaxDistance} setQuery={setQuery} setLoggedIn={setLoggedIn}/>
            <Container className="mt-5">
                <Row>
                    <Col xs={12} md={3}>
                        {loggedIn && <Offers />}
                    </Col>
                    <Col xs={12} md={6}>
                        <section className="new-games">
                            <h1>Nearby Games for Trade</h1>
                            {matchingGames.length > 0 ? matchingGames.map(
                                (g,i) => <GameComponent key={g._id} game={g} even={i % 2 === 0}/>
                            )
                            : <p>No results</p>
                            }
                        </section>
                    </Col>
                    <Col xs={12} md={3}>
                        {loggedIn && <section className="own-games">
                            <h3>Your Games</h3>
                            {ownGames.length > 0 ? 
                                ownGames.map(g => <div className="main-owngame" key={g._id} onClick={() => navigate(`/game/${g._id}`)}>{g.name}</div>)
                            : <p>No games yet</p>}
                        </section>}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage