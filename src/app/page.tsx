import CardPost from "@/components/CardPost"
import { IPost } from "@/interfaces/IPosts"
import styles from './page.module.css'
import logger from "@/logger"
import Link from "next/link"
import db from "../../prisma/db"

interface PropsPost {
  data: IPost[]
  prev: number | null
  next: number | null
}

interface PropsSearch {
  page: string
}

const getAllPosts = async (page : number) => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true
      }
    })
    logger.info('deu tudo certo, graças a Deus')
    return { data: posts, prev: null, next: null }
  } catch (error) {
    logger.error('Falha ao obter posts', { error })
    return { data: [], prev: null, next: null }
  }    
}

export default async function Home({ searchParams } : { searchParams : PropsSearch } ) {
  const currentPage = Number(searchParams?.page) || 1
  const { data, prev, next } : PropsPost = await getAllPosts(currentPage)

  return (
    <div className={styles.content}>
      <section className={styles.posts__container}>
        {
          data.map(post=> <CardPost key={post.id} post={post}/>)
        }
      </section>
      <footer className={ !prev || !next ? `${styles.footer__container} ${styles.footer__center}` : styles.footer__container }>
        {prev && <Link className={styles.ancor_page} href={`/?page=${prev}`}>Página anterior</Link>}
        {next && <Link className={styles.ancor_page} href={`/?page=${next}`}>Próxima página</Link>}
      </footer>
    </div>
  )
}
