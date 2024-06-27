import { IComment } from "@/interfaces/IComment";
import db from "../../../../../../prisma/db";

export async function GET (_request: Request, { params } : {params: IComment}) {
    const data = await db.comment.findMany({
        where: {
            parentId: Number(params.id)
        },
        include: {
            author: true
        }
    })
    return Response.json(data)
}