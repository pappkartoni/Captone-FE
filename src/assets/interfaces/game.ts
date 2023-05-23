export interface Game {
    _id: string,
    name: string,
    description: string,
    asking: number,
    variance: number,
    owner: {_id: string, name: string, email: string, avatar?: string}
    images: string[]
}