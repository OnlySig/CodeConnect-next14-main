'use client'

import { useEffect, useState } from 'react'
import styles from './replies.module.css'
import { IComment } from '@/interfaces/IComment'
import Comment from '../Comment'
import Loader from '../Loader'

const Replies = ({ comment } : { comment: IComment }) => {

    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState<IComment[]>([])
    const [pending, setPending] = useState(false)

    const fetchData = async ()=> {
        try {
            setPending(true)
            const response = await fetch(`/api/comment/${comment.id}/replies`)
            const data = await response.json()
            setReplies(data)
        } catch (error) {
            console.log('deu ruim: ',error)
        } finally {
            setPending(false)
        }
    }
    useEffect(()=>{
        if(showReplies) {
            fetchData()
        }
    }, [showReplies])
    return (<div className={styles.container}>
        <div className={styles.replies}>
            <button className={styles.btn} onClick={() => setShowReplies(!showReplies)}>
                {showReplies ? 'Ocultar' : 'Ver'} respostas
            </button>
            {showReplies && 
                <>
                    <ul>
                        {replies.length > 0 ? replies?.map(reply => 
                            <li key={reply.id} className={styles.comment__item}>
                                <Comment comentario={reply} isMainComment/>
                            </li>
                        ) : pending ? <Loader/> : <h3>Sem resposta!</h3>}
                    </ul>
                </>
            }
        </div>
    </div>)
}

export default Replies