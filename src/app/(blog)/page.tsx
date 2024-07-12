import CardPost from "@/components/CardPost"
import { IPost } from "@/interfaces/IPosts"
import styles from './page.module.css'
import logger from "@/logger"
import Link from "next/link"
import db from "../../../prisma/db"

interface PropsPost {
  data: IPost[]
  prev: number | null
  next: number | null
}

interface PropsSearch {
  page: string
  q: string
}

const getAllPosts = async (page: number, query: string) => {
  try {
    const where : { title?: { contains: any,  mode: any } } = {}
    if(query) {
      where.title = {
        contains: query,
        mode: 'insensitive'
      }
    }
    const perPage = 6
    const skip = (page - 1) * perPage //esse skip, ele passa tantos elementos assim q vc quiser. nesse exemplo ele pega page q é 1 (na primeira pagina) e faz (1 - 1) * perPage = 0, assim ele n skipa nada na primeira pagina.
    const totalItens = await db.post.count({ where }) // esse rapaz traz o "length" do db
    const totalPages = Math.ceil(totalItens / perPage) // esse ceil do javascript arredonda o numero, e a logica é pegar totalItens e dividir por perPage, naqual limita a qtd de paginas no take la em posts
    const prev = page > 1 ? page - 1 : null //logica do prev, paginação maior q 1 ? page -1, é menor q 1 ? recebe null
    const next = page < totalPages ? page + 1 : null //logica do next, paginação menor que totalPages ? page + 1, paginação igual a totalPages ? recebe null

    const posts = await db.post.findMany({
      take: perPage, // [PAGINAÇÃO] PEGA APENAS 6 ELEMENTOS DA NOSSA PÁGINA
      skip,
      where,
      orderBy: { id: 'desc' }, // [ORDENAÇÃO] ESTAMOS ORDENANDO NOSSO BD EM createdAt
      include: { //esse bd necessita de um outro schema, fulgo User, esse author é justamente a chave estrangeira, e tem q fazer assim pra INCLUIR no posts
        author: true,
        comments: true
      }
    })
    logger.info('deu tudo certo, graças a Deus')
    return { data: posts, prev: prev, next: next }
  } catch (error) {
    logger.error('Falha ao obter posts', { error })
    return { data: [], prev: null, next: null }
  }    
}

export default async function Home({ searchParams } : { searchParams : PropsSearch } ) {
  const currentPage = parseInt(searchParams?.page) || 1
  const searchTerm = searchParams?.q
  const { data, prev, next } : PropsPost = await getAllPosts(currentPage, searchTerm)

  return (
  <div className={styles.content}>
    <section className={styles.posts__container}>
      {
        data.length === 0 
          ? <h1>Está vazio...</h1> 
          : data.map(post=> <CardPost key={post.id} post={post}/>)
      }
    </section>
    <footer className={ !prev || !next ? `${styles.footer__container} ${styles.footer__center}` : styles.footer__container }>
      {prev && <Link className={styles.ancor_page} href={{ pathname: '/', query: { page: prev, q: searchTerm } }}>Página anterior</Link>}
      {next && <Link className={styles.ancor_page} href={{ pathname: '/', query: { page: next, q: searchTerm } }}>Próxima página</Link>}
    </footer>
    </div>
  )
}
