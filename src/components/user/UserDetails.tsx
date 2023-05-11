import { Container } from "react-bootstrap"
import { useAppSelector } from "../../redux/hooks"
import { useParams } from "react-router-dom"

const UserDetails = () => {
    const self = useAppSelector(state => state.user.user)
    const id = useParams().id

    const user = useAppSelector(state => state.users.users.find(u => u._id === id))

    return (
        <Container>
            {user && <section>
                <h2>{id === self._id ? "Your profile" : `${user?.name}'s profile`}</h2>
                <p>Completed Trades: {user.trades}</p>
            </section>}
        </Container>
    )
}