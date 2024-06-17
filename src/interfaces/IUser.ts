import { IPost } from "./IPosts"

export interface IUser {
    id: number
    name: string
    username: string
    avatar: string
    Post?: IPost[]
}