import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options';
import { ISession } from '@/interfaces/ISession';
import db from '../../../../prisma/db';
 
export async function POST(request: Request): Promise<NextResponse> {
    const session : ISession | null = await getServerSession(options)
    if(!session) {
      return NextResponse.json({ error: 'Not authenticated' }, {status: 401})
    }
    const filename = session.user.name

    const blob = await put(filename!, request.body, {
      access: 'public',
    });
 
    await db.user.update({
        where: {
            email: session?.user.email
        },
        data: {
            avatar: blob.url
        }
    })
  return NextResponse.json(blob);
}