import Image from 'next/image'
import React from 'react'
import Avatar from '../Avatar'
import styles from './CardPost.module.css'
import Link from 'next/link';

interface PropsPost {
    id: number;
    cover: string;
    title: string;
    slug: string;
    body: string;
    markdown: string;
    author: {
        id: number;
        name: string;
        username: string;
        avatar: string;
    };
}

const CardPost = ({ post, inSlug = false } : { post: PropsPost, inSlug?: boolean }) => {
    return (
        <article className={inSlug ? `${styles.article__container} ${styles.articleSlug__container}` : styles.article__container}>
            <header className={inSlug ?  `${styles.image__container} ${styles.imageSlug__container}` : styles.image__container}>
                <figure className={styles.image__item}>
                    <Image 
                        className={styles.image}
                        alt={`capa do post ${post.title}`}
                        src={post.cover}
                        width={inSlug ? 960 : 438 }
                        height={inSlug ? 300 : 133}
                    />
                </figure>
            </header>
            <section className={ inSlug ? `${styles.section__container} ${styles.sectionSlug__container}` : `${styles.section__container}`}>
                <h2 className={styles.title__section__item}>{post.title}</h2>
                <p className={styles.paragraf__section}>{post.body}</p>
                {!inSlug && <Link className={styles.ancor__section__item} href={`/posts/${post.slug}`}>Ver detalhes</Link>}
                <footer className={styles.footer__container}>
                    <Avatar image={post.author.avatar} name={post.author.username}/>
                </footer>
            </section>
        </article>
    )
}

export default CardPost