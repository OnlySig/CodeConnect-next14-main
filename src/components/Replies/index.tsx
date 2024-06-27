'use client'

import { useEffect, useState } from 'react'
import styles from './replies.module.css'
import { IComment } from '@/interfaces/IComment'
import Image from 'next/image'
import ModalReply from '../ModalReply'

const Replies = ({ comment } : { comment: IComment }) => {

    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState<IComment[]>([])

    const fetchData = async ()=> {
        const response = await fetch(`/api/comment/${comment.id}/replies`)
        const data = await response.json()
        setReplies(data)
    }
    useEffect(()=>{
        if(showReplies) {
            fetchData()
        }
    }, [showReplies])
    console.log(replies)
    return (<div className={styles.container}>

        <div className={styles.replies}>
            <button className={styles.btn} onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Ocultar' : 'Ver'} respostas
            </button>
            {showReplies && 
                <ul>
                    {replies.length > 0 ? replies?.map(reply => 
                        <li key={reply.id} className={styles.comment__item}>
                            <div className={styles.iconName}>
                                <Image src={reply.author?.avatar!} alt={reply.author?.name!} width={32} height={32}/>
                                <h3>@{reply.author?.name}</h3>
                            </div>
                            <div className={styles.reply__text}>
                                {reply.text}
                                <ModalReply comment={reply}/>
                            </div>
                        </li>
                    ) : <h1>Sem respostas</h1>}
                </ul>
            }
        </div>
    </div>)
}

export default Replies