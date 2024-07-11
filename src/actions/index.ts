'use server'
import { IPost } from "@/interfaces/IPosts";
import db from "../../prisma/db";
import { revalidatePath } from "next/cache";
import { IComment } from "@/interfaces/IComment";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ISession } from "@/interfaces/ISession";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

export async function incrementThumbsUp(post: IPost) {
    //await new Promise((resolve) => setTimeout(resolve, 500)) //cria um delay
    await db.post.update({
        where: {
            id: post.id
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })
    revalidatePath("/")
    revalidatePath(`/${post.slug}`)
}

export async function postComment(post: IPost, formData: FormData) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) //cria um delay
    // const author = await db.user.findFirst({
    //     where: {
    //         username: 'anabeatriz_dev'
    //     }
    // })

    const session : ISession | null = await getServerSession(options) 
    if(!session) {
        redirect('/api/auth/signin')
    }
    const text = formData.get('text')
    if(typeof text !== 'string') {
        throw new Error('FormData inválido, texto não é do tipo string!')
    }
    await db.comment.create({
        data: {
            text,
            authorId: session.user.id,
            postId: post.id
        }
    })
    revalidatePath("/")
    revalidatePath(`/${post.slug}`)
}

export async function postReplay(parent: IComment, formData: FormData) {
    //await new Promise((resolve) => setTimeout(resolve, 1000)) //cria um delay
    // const author = await db.user.findFirst({
    //     where: {
    //         username: 'anabeatriz_dev'
    //     }
    // })

    const session : ISession | null = await getServerSession(options)
    if(session === null) {
        throw new Error('loga ai pls') 
    }
    const post = await db.post.findFirst({
        where: {
            id: parent.postId
        }
    })

    const text = formData.get('text')
    if(typeof text !== 'string') {
        throw new Error('FormData inválido, texto não é do tipo string!')
    }
    await db.comment.create({
        data: {
            text,
            authorId: session?.user?.id,
            postId: post!.id,
            parentId: parent.parentId ?? parent.id
        }
    })
    revalidatePath(`/${post!.slug}`)
}

export async function createUser(formData: any) {
    try {
        const hashedPassword = bcrypt.hashSync(formData.get('password'), 10) // para ter segurança na senha, encriptamos a senha para n ter ela exposta diretamente no banco de dados.
        const name = formData.get('name')
        const email = formData.get('email')
        if(typeof name !== 'string' || typeof email !== 'string') {
            throw new Error('FormData inválido, texto não é do tipo string!')
        }
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        console.log('Cadastro finalizado com SUCESSO!')
    } catch (error) {
        console.log('deu ruim error: ',error)
        return
    }
    redirect('/signin')
}