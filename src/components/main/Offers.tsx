import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"

const Offers = () => {
    const sent = useAppSelector(state => state.offers.sent).filter(o => o.status === "pending")
    const recieved = useAppSelector(state => state.offers.recieved).filter(o => o.status === "pending")
    const navigate = useNavigate()

    return (
        <section className="main-offers">
            <h3>Your Offers</h3>
            {sent.length === 0 && recieved.length === 0 ? <p>No offers yet</p> : 
            <>
                {sent.length > 0 && <><h4>Sent</h4> {sent.map(o => <div key={o._id} onClick={() => navigate(`/trade/${o._id}`)} className="trade-game d-flex align-items-center">
                    <div className="offer-wrapper">
                        <img className="offer-img" src={o.game.images.length ? o.game.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"}alt="bla" />
                    </div>
                    <h5>{o.game.name}</h5>
                </div>)}</>}
                {recieved.length > 0 && <><h4>Recieved</h4> {recieved.map(o => <div key={o._id} onClick={() => navigate(`/trade/${o._id}`)} className="trade-game d-flex align-items-center">
                    <div className="offer-wrapper">
                        <img className="offer-img" src={o.game.images.length ? o.game.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"}alt="bla" />
                    </div>
                    <h5>{o.game.name}</h5>
                </div>)}</>}
            </>
            }
        </section>
    )
}

export default Offers