import { IAccount } from "./IAccount"
import { IComment } from "./IComment"
import { IPost } from "./IPosts"
import { ISession } from "./ISession"

export interface IUser {
    id: number
    name?: string
    username?: string
    avatar?: string
    email?: string
    emailVerified?: Date
    image?: string
    password?: string
    Post?: IPost[]
    comments?: IComment | null
    Account?: IAccount[]
    Session?: ISession
}