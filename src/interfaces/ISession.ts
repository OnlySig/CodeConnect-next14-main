import { IUser } from "./IUser"

export interface ISession {
    sessionToken: string
    userId: number
    expires: Date
    user: IUser
    createdAt: Date
    updatedAt: Date
}