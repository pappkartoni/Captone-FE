import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { makeOffer } from "../../redux/actions";

const NewOffer = () => {
    const id = useParams().id
    const dispatch = useAppDispatch()
    const ownGames = useAppSelector(state => state.ownGames.games)
    const [game, setGame] = useState({_id: "", name: "", description: "", owner: {_id: "", name: ""}})
    const [checkeds, setCheckeds] = useState<string[]>([])

    const makeNewOffer = () => {
        console.log(game.owner.name)
        if (id)
        dispatch(makeOffer({to: game.owner._id, for: id, offer: checkeds}))
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
    return (<section className="mt-5 p-3">
        <h2>Offer something for: {game.name}</h2>
        {ownGames.length > 0 ?
        <div className="form-check">
            {ownGames.map(g => 
            <div key={g._id}>
                <input type="checkbox" className="form-check-input" value={g._id} onChange={e => e.target.checked ? setCheckeds([...checkeds, e.target.value]) : setCheckeds(checkeds.filter(s => s !== e.target.value))
                }/>
                <label className="form-check-label">{g.name}</label>
            </div>
            )}
        </div>
        : <p>Seems like you have no games to offer</p>}
        <Button disabled={checkeds.length === 0} onClick={makeNewOffer}>Make offer</Button>
    </section>)
}

export default NewOffer