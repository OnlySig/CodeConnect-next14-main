import { IUser } from "./IUser";

export interface IPost {
    id: number;
    cover: string;
    title: string;
    slug: string;
    body: string;
    markdown: string;
    createdAt?: Date;
    updatedAt?: Date;
    author: IUser;
}