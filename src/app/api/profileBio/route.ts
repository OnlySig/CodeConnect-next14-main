import { NextResponse } from "next/server";
import db from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { ISession } from "@/interfaces/ISession";
import { revalidatePath } from "next/cache";

export async function POST(request: Request): Promise<NextResponse> {
    const session : ISession | null = await getServerSession(options)

    if(!session) {
        return NextResponse.json({ error: 'Not authenticated' }, {status: 401})
    }

    const { bio } = await request.json()

    await db.user.update({
        where: {
            email: session.user.email 
        },
        data: {
            bio
        }
    })
    return NextResponse.json({ message: 'Bio updated successfully' })
}