import { Button, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { useNavigate, useParams } from "react-router-dom"
import Navi from "../main/Navi"
import { useEffect, useState } from "react"
import { Offer } from "../../redux/interface"
import ProfileEdit from "./ProfileEdit"

const UserDetails = () => {
    const self = useAppSelector(state => state.user.user)
    const id = useParams().id
    const [showTrades, setShowTrades] = useState(false)
    const [trades, setTrades] = useState<Offer[]>([])
    const user = useAppSelector(state => state.users.users.find(u => u._id === id))
    const sent = useAppSelector(state => state.offers.sent)
    console.log(sent)
    const recieved = useAppSelector(state => state.offers.recieved)
    const navigate = useNavigate()

    const getCompletedTrades = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/${id}/accepted`)
            if (res.ok) {
                const data = await res.json()
                setTrades(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id !== self._id) {
            getCompletedTrades()
        } else {
            setShowTrades(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Navi />
            <Container className="mt-5">
                {id === self._id ? 
                <section className="profile-sec">
                    <h2>{`Your Profile`}</h2>
                    {id === self._id && <ProfileEdit />}
                    <h3 className="mt-3">Your Trades: {sent.length} sent / {recieved.length} recieved</h3>
                    {showTrades && <Row>
                        <Col xs={12} lg={6}>
                            <h5>Sent</h5>
                            {sent.length === 0 ? <p>No sent trades yet</p> : 
                                <ListGroup>
                                    {sent.map(t => 
                                        <span className="profile-trade" onClick={() => navigate(`/trade/${t._id}`)} key={t._id}>
                                            <ListGroupItem className={`trade ${t.status}`}>
                                                For Game: {t.game.name}, with: {t.to.name}
                                            </ListGroupItem>    
                                        </span>
                                    )}
                                </ListGroup>
                            }                            
                        </Col>
                        <Col xs={12} lg={6}>
                        <h5>Recieved</h5>
                        {recieved.length === 0 ? <p>No recieved trades yet</p> : 
                            <ListGroup>
                                    {recieved.map(t => 
                                        <span className="profile-trade" onClick={() => navigate(`/trade/${t._id}`)} key={t._id}>
                                            <ListGroupItem className={`trade ${t.status}`}>
                                                For Game: {t.game.name}, with: {t.by.name}
                                            </ListGroupItem>    
                                        </span>
                                    )}
                            </ListGroup>
                        }                            
                        </Col>
                    </Row>}                        
                </section>
                :
                <>
                    {user && <section className="profile-sec">
                        <h2>{`${user.name}'s Profile`}</h2>
                        <Row>
                            <Col xs={12} lg={6} className="user-left">
                                <div>
                                    <h4>About:</h4>
                                    <p className="user-info-field about">{user.about ? user.about : "No information about this user"}</p>
                                </div>
                                <div>
                                    <h4>Location:</h4>
                                    <p className="user-info-field">{user.location ? user.location.name : "Unknown"}</p>
                                </div>
                            </Col>
                            <Col xs={12} lg={6} className="user-right">
                                <div className="img-wrapper">
                                    <img className="profile-avatar" src={user.avatar? user.avatar : "/avatar.jpg"} alt="avatar"/>
                                </div>
                            </Col>
                        </Row>
                        <h3 className="mt-3">Completed Trades: {user.trades} <Button onClick={() => setShowTrades(!showTrades)}>{showTrades ? "Hide" : "Show"}</Button></h3>
                        {showTrades && <>
                            {trades.length === 0 ? <p>No trades yet</p> : 
                                <ListGroup>
                                    {trades.map(t => 
                                        <span className="profile-trade" onClick={() => navigate(`/trade/${t._id}`)} key={t._id}>
                                            <ListGroupItem className={`trade ${t.status}`}>
                                                For Game: {t.game.name}, with: {t.to._id === user._id ? t.by.name : t.to.name}
                                            </ListGroupItem>    
                                        </span>
                                    )}
                                </ListGroup>
                            }
                        </>}                        
                    </section>}
                </>
                }
            </Container>
        </>
    )
}

export default UserDetails