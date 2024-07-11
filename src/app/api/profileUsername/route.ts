import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ISession } from "@/interfaces/ISession";
import db from "../../../../prisma/db";

export async function POST(request: Request): Promise<NextResponse> {
    const session : ISession | null = await getServerSession(options)
    if(!session) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
    const { username } = await request.json()

    await db.user.update({
        where: {
            email: session.user.email
        },
        data: {
            username
        }
    })
    return NextResponse.json({ message: 'username updated successfully' })
}