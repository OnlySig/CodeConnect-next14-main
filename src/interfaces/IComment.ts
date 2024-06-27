import { IUser } from "./IUser"

export interface IComment {
    id: number
    text: string
    createdAt: Date
    updatedAt: Date
    authorId: number
    children?: IComment[]
    author?: IUser
    postId: number
    parentId: number | null
}