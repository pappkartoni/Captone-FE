import { useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { useEffect } from "react"

const OfferDetails = () => {
    const id = useParams()._id
    const user = useAppSelector(state => state.user.user)

    const getOffer = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BE_URL}/offers/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if (res.ok) {

            }
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
        <p>{id}</p>
        </>
    )
}

export default OfferDetails