'use client'

import { useState } from 'react'
import styles from './replies.module.css'
import { IComment } from '@/interfaces/IComment'
import Image from 'next/image'
import ModalReply from '../ModalReply'

const Replies = ({ comment } : { comment: IComment }) => {

    const [showReplies, setShowReplies] = useState(false)

    return (<div className={styles.container}>

        <div className={styles.replies}>
            <button className={styles.btn} onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Ocultar' : 'Ver'} respostas
            </button>
            {showReplies && 
                <ul>
                    {comment.children?.map(reply => 
                        <div key={reply.id}>
                            <li className={styles.comment__item}>
                                <Image src={reply.author?.avatar!} alt={reply.author?.name!} width={32} height={32}/>
                                <h3>@{reply.author?.name}</h3>
                                {reply.text}
                                <ModalReply comment={reply}/>
                            </li>
                        </div>
                    )}
                </ul>}
        </div>
    </div>)
}

export default Replies