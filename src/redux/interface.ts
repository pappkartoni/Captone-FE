export interface Store {
    user: {
        _id: string,
        name: string,
        email: string,
        avatar?: string
    }
}