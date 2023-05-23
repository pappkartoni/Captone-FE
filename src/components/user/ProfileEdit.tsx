import { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { User } from "../../redux/interface"
import { Button, Col, Form, Row } from "react-bootstrap"
import { editUserData } from "../../redux/actions"
//import avatar from "../../../public/avatar.jpg"

const ProfileEdit = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const [userEdit, setUserEdit] = useState<User>(user)
    const [rawLocation, setRawLocation] = useState(user.location ? user.location.name : "")
    const [image, setImage] = useState<File | null>(null)

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const locationObject = await createLocation()
        console.log(locationObject)

        dispatch(editUserData({data: {...userEdit, location: locationObject}, image: image}))
    }

    const createLocation = async () => {
        try {
            const url = "http://api.openweathermap.org/geo/1.0/direct"
            const apiKey = "b47b152489a094d3461a4adacfa28468"
            const res = await fetch(`${url}?q=${rawLocation}&limit=1&appid=${apiKey}`)
            if (res.ok) {
                const data = await res.json()
                return data[0]
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="user-edit">
            <Form onSubmit={submitForm}>
                <Row className="mb-3">
                    <Col xs={12} lg={6} className="left-edit">
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={userEdit.name} onChange={e => setUserEdit({...userEdit, name: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>About you</Form.Label>
                            <Form.Control as="textarea" value={userEdit.about} onChange={e => setUserEdit({...userEdit, about: e.target.value})} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" value={rawLocation} onChange={e => setRawLocation(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} lg={6} className="right-edit">
                        <Form.Group>
                            <Form.Label>Avatar</Form.Label>
                            <div className="img-wrapper">
                                <img className="profile-avatar" src={user.avatar? user.avatar : "/avatar.jpg"} alt="avatar"/>
                            </div>
                            <Form.Control type="file" accept="image/*" onChange={(e: any) => setImage(e.target.files[0])}></Form.Control>
                        </Form.Group>

                    </Col>
                </Row>
                <Button type="submit">Update</Button>
            </Form>
        </div>
    )
}

export default ProfileEdit