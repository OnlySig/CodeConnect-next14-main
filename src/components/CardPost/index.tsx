import Image from 'next/image'
import React from 'react'
import Avatar from '../Avatar'
import styles from './CardPost.module.css'
import Link from 'next/link';
import { incrementThumbsUp, postComment } from '@/actions';
import ThumbsUpButton from './ThumbsUpButton';
import ModalComment from '../ModalComment';
import { IPost } from '@/interfaces/IPosts';

const CardPost = ({ post, inSlug = false } : { post: IPost, inSlug?: boolean }) => {
    const submitThumbsUp = incrementThumbsUp.bind(null, post)
    const submitComment = postComment.bind(null, post)
    return (
        <article className={inSlug ? `${styles.article__container} ${styles.articleSlug__container}` : styles.article__container}>
            <header className={styles.image__container}>
                <figure className={styles.image__item}>
                    <Image 
                        className={inSlug ? `${styles.slugImage} ${styles.image}` : styles.image}
                        alt={`capa do post ${post.title}`}
                        src={post.cover}
                        width={950}
                        height={inSlug ? 300 : 133}
                    />
                </figure>
            </header>
            <section className={ inSlug ? `${styles.section__container} ${styles.sectionSlug__container}` : `${styles.section__container}`}>
                <h2 className={styles.title__section__item}>{post.title}</h2>
                <p className={styles.paragraf__section}>{post.body}</p>
                {!inSlug && <Link className={styles.ancor__section__item} href={`/posts/${post.slug}`}>Ver detalhes</Link>}
                <footer className={styles.footer__container}>
                    <div className={styles.icon__container}>
                        <div>
                            <form action={submitThumbsUp}>
                                <ThumbsUpButton/>
                            </form>
                            <p>{post.likes}</p>
                        </div>
                        <div>
                            <ModalComment action={submitComment}/>
                            <p>{post.comments?.length}</p>
                        </div>
                    </div>
                    {post.author.image || post.author.avatar && <Avatar image={post.author.avatar ?? post.author.image} name={post.author.username ?? ''}/>}
                </footer>
            </section>
        </article>
    )
}

export default CardPost