import { IComment } from '@/interfaces/IComment'
import styles from './Comment.module.css'
import React from 'react'
import Image from 'next/image'
import ModalReply from '../ModalReply'

const Comment = ({ comentario } : {comentario : IComment}) => {
    return (
        <div className={styles.container__comment}>
            <div className={styles.content__comment}>
                <Image src={comentario.author?.avatar!} alt={comentario.author?.name!} width={32} height={32}/>
                <h3>@{comentario.author?.name}</h3>
            </div>
            <div className={styles.comment}>
                <p>{comentario.text}</p>
                <ModalReply comment={comentario}/>
            </div>
        </div>
    )
}

export default Comment