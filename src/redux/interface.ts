export interface Game {
    _id: string,
    name: string,
    description: string,
    asking: number,
    variance: number,
    owner: User,
    images: string[]
}

export interface User {
    _id: string,
    name: string,
    email: string,
    avatar?: string,
    trades: number
}

export interface Offer {
    _id: string,
    by: User,
    to: User,
    game: Game,
    offer: Game[]
    status: string,
}