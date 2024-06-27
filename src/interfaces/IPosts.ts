import { IComment } from "./IComment";
import { IUser } from "./IUser";

export interface IPost {
    id: number;
    cover: string;
    title: string;
    slug: string;
    body: string;
    likes?: number;
    markdown: string;
    createdAt?: Date;
    updatedAt?: Date;
    author: IUser;
    comments?: IComment[]
}