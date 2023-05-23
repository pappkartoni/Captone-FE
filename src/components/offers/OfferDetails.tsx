import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { Offer } from "../../redux/interface"
import { acceptOffer, declineOffer } from "../../redux/actions"
import Navi from "../main/Navi"

const OfferDetails = () => {
    const id = useParams().id
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.user)
    const [trade, setTrade] = useState<Offer>()
    const getOffer = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setTrade(data)
            }
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getOffer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Navi></Navi>
            <Container className="mt-5">
                <section className="p-3">
                    <h2>Trade Details</h2>
                    {trade &&
                        <>
                            <p>Trade between {trade.by.name} and {trade.to.name} (Status: <span className={`status-${trade.status}`}>{trade.status}</span>)</p>
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="offer-by">
                                    <h4>{trade.by.name} offered</h4>
                                    {trade.offer.map(g => 
                                        <div onClick={() => navigate(`/game/${g._id}`)} key={g._id} className="trade-game d-flex align-items-center">
                                            <div className="offer-wrapper">
                                                <img className="offer-img" src={g.images.length ? g.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"}alt="bla" />
                                            </div>
                                            <h5>{g.name}</h5>
                                        </div>
                                    )}
                                </div>
                                <div className="offer-to">
                                    <h4>For {trade.to.name}'s</h4>
                                    <div onClick={() => navigate(`/game/${trade.game._id}`)} className="trade-game d-flex align-items-center">
                                        <div className="offer-wrapper">
                                            <img className="offer-img" src={trade.game.images.length ? trade.game.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"}alt="bla" />
                                        </div>
                                        <h5>{trade.game.name}</h5>
                                    </div>
                                </div>
                            </div>
                            {(trade.status === "pending" && (user._id === trade.by._id || user._id === trade.to._id)) &&
                                <>
                                    <Button onClick={() => {dispatch(declineOffer(trade._id)); navigate(`/user/${user._id}`)}}>{user._id === trade.to._id ? "Decline" : "Cancel Trade"}</Button>
                                    {user._id === trade.to._id && <Button onClick={() => dispatch(acceptOffer(trade._id))}>Accept</Button>}
                                </>
                            }
                        </>
                    }
                </section>
            </Container>
        </>
    )
}

export default OfferDetails