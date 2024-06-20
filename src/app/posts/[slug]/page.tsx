import styles from './PageSlug.module.css'
import CardPost from "@/components/CardPost"
import { IPost } from "@/interfaces/IPosts"
import logger from "@/logger"
import db from '../../../../prisma/db'
import { remark } from 'remark'
import html from 'remark-html';
import { redirect } from 'next/navigation'
import InputSearch from '@/components/InputSeach'

const getPostBySlug = async (slug : string): Promise<IPost | null> => {
    try {
        const post = await db.post.findFirst({
            include: {
                author: true
            },
            where: { //esse where é como se fosse um filter e o parâmetro é o slug
                slug, //forma abreviada de fazer assim: slug: slug, pois o where é um objeto e como objeto podemos assim abreviar
            }
        })
        if(!post) {
            throw new Error(`Post com o slug: ${slug}, não foi encontrado.`)
        }
        const processedContent = await remark()
            .use(html)
            .process(post.markdown)
        const contentHtml = processedContent.toString()
        post.markdown = contentHtml
        return post
    } catch (error) {
        logger.error(`${(error as Error).message}`)
    }
    redirect("/not-found")
}

interface propsParams {
    slug : string
}

const PageSlug = async ({ params } : { params: propsParams }) => {
    const post : IPost | null = await getPostBySlug(params.slug)     
    return (
        <section className={styles.container__post}>
            <InputSearch/>
            <CardPost post={post!} inSlug/>
            <section className={styles.contentCode}>
                <h2 className={styles.subTitleSlug}>Código:</h2>
                <footer className={styles.footerSlug__container}>
                    <div className={styles.markdownContent} dangerouslySetInnerHTML={{ __html: post!.markdown }} />
                </footer>
            </section>
        </section>
    )
}

export default PageSlug