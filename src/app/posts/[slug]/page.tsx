import styles from './PageSlug.module.css'
import CardPost from "@/components/CardPost"
import { IPost } from "@/interfaces/IPosts"
import logger from "@/logger"
import { remark } from 'remark'
import html from 'remark-html'

const getPostBtSlug = async (slug : string) => {
    try {
        const resp = await fetch(`http://localhost:3042/posts?slug=${slug}`)
        if(!resp.ok) {
            logger.error('erro na rede!')
            return {}
        }
        const data = await resp.json()
        const post = data[0]
        const processedContent = await remark()
            .use(html)
            .process(post.markdown)
        const contentHtml = processedContent.toString()
        post.markdown = contentHtml
        return post
    } catch (error) {
        logger.error(`${(error as Error).message}`)
        return {}
    }
}

interface propsParams {
    slug : string
}

const PageSlug = async ({ params } : { params: propsParams }) => {
    const post : IPost = await getPostBtSlug(params.slug) 
    return (
        <section className={styles.container__post}>
            <CardPost post={post} inSlug/>
            <section className={styles.contentCode}>
                <h2 className={styles.subTitleSlug}>Código:</h2>
                <footer className={styles.footerSlug__container}>
                    <div className={styles.markdownContent} dangerouslySetInnerHTML={{ __html: post.markdown }} />
                </footer>
            </section>
        </section>
    )
}

export default PageSlug