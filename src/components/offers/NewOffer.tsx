import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { makeOffer } from "../../redux/actions";
import Navi from "../main/Navi";

const NewOffer = () => {
    const id = useParams().id
    const dispatch = useAppDispatch()
    const ownGames = useAppSelector(state => state.ownGames.games)
    const [game, setGame] = useState({_id: "", name: "", description: "", owner: {_id: "", name: ""}})
    const [checkeds, setCheckeds] = useState<string[]>([])
    const navigate = useNavigate()

    const makeNewOffer = () => {
        console.log(game.owner.name)
        if (id)
        dispatch(makeOffer({to: game.owner._id, for: id, offer: checkeds}))
        navigate("/")
    }
    
    const getGameInfo = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/games/${id}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`
                }
            })
            if (res.ok) {
                const data = await res.json()
                setGame(data)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(() => {
        getGameInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <>
            <Navi />
            <Container className="mt-5">
                <section className="mt-5 p-3 offer-details">
                    <h2>Offer something for: {game.name}</h2>
                    {ownGames.length > 0 ?
                    <div className="form-check">
                        {ownGames.map(g => 
                        <div key={g._id} className="d-flex">
                            <input type="checkbox" className="form-check-input" value={g._id} onChange={e => e.target.checked ? setCheckeds([...checkeds, e.target.value]) : setCheckeds(checkeds.filter(s => s !== e.target.value))
                            }/>
                            <label className="ms-3 mb-3 d-flex form-check-label align-items-center">
                                <div className="img-wrapper"><img className="offer-img" src={g.images.length > 0 ? g.images[0] : "https://res.cloudinary.com/dhjtlovyg/image/upload/v1679047148/u4-marketplace/pic4261026_nyxwxf.jpg"} alt="..."/>
                                </div>
                                <span>{g.name}</span>
                            </label>
                        </div>
                        )}
                    </div>
                    : <p>Seems like you have no games to offer</p>}
                    <Button disabled={checkeds.length === 0} onClick={makeNewOffer}>Make offer</Button>
                </section>
            </Container>
        </>
    )
}

export default NewOffer