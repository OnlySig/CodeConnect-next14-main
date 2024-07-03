import { IComment } from '@/interfaces/IComment'
import styles from './Comment.module.css'
import React from 'react'
import Image from 'next/image'
import ModalReply from '../ModalReply'

const Comment = ({ comentario, className ,isMainComment = false } : {comentario : IComment, isMainComment?: boolean, className?: string}) => {
    const imgSrc = comentario.author?.avatar ?? comentario.author?.image
    return (
        <div className={className ? className : styles.container__comment}>
            <div className={className ? styles.reply__content : styles.content__comment}>
                {imgSrc && <Image src={imgSrc} className={styles.image__comment} alt={comentario.author?.name!} width={32} height={32}/>}
                <h3>@{comentario.author?.name}</h3>
            </div>
            <div className={className ? styles.reply__comment : styles.comment}>
                <p>{comentario.text}</p>
                {isMainComment && <ModalReply comment={comentario}/>}
            </div>
        </div>
    )
}

export default Comment