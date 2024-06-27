'use server'
import { IPost } from "@/interfaces/IPosts";
import db from "../../prisma/db";
import { revalidatePath } from "next/cache";
import { IComment } from "@/interfaces/IComment";

export async function incrementThumbsUp(post: IPost) {
    await new Promise((resolve) => setTimeout(resolve, 500)) //cria um delay
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
    await new Promise((resolve) => setTimeout(resolve, 1000)) //cria um delay
    const author = await db.user.findFirst({
        where: {
            username: 'anabeatriz_dev'
        }
    })
    const text = formData.get('text')
    if(typeof text !== 'string') {
        throw new Error('FormData inválido, texto não é do tipo string!')
    }
    await db.comment.create({
        data: {
            text,
            authorId: author!.id,
            postId: post.id
        }
    })
    revalidatePath("/")
    revalidatePath(`/${post.slug}`)
}

export async function postReplay(parent: IComment, formData: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000)) //cria um delay
    const author = await db.user.findFirst({
        where: {
            username: 'anabeatriz_dev'
        }
    })

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
            authorId: author!.id,
            postId: post!.id,
            parentId: parent.parentId ?? parent.id
        }
    })
    revalidatePath(`/${post!.slug}`)
}