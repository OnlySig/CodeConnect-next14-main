'use client'
import { IComment } from '@/interfaces/IComment'
import React, { useRef, useState } from 'react'
import Modal from '../Modal'
import SubmitButton from '../SubmitButton'
import IconButton from '../IconButton'
import { postReplay } from '@/actions'
import styles from './ModalReply.module.css'
import Comment from '../Comment'

const ModalReply = ({ comment } : { comment: IComment }) => {
    const modalRef = useRef<{openModal:()=>void, closeModal: ()=>void}>(null)
    const [txArea, setTxArea] = useState('')
    const handleSubmit = () => {
        modalRef.current?.closeModal()
        setTxArea('')
    }
    const action = postReplay.bind(null, comment)
    return (
        <>
            <Modal ref={modalRef}>
                <form action={action} className={styles.form__modalReply} onSubmit={handleSubmit}>
                    <Comment comentario={ comment } className={`${styles.commentModalReply}`}/>
                    <textarea className={styles.textArea__modalReply} value={txArea} onChange={e=>setTxArea(e.target.value)} required rows={8} name="text"></textarea>
                    <div className={styles.btn__reply}>  
                        <SubmitButton>
                            Responder
                        </SubmitButton>
                    </div>
                </form>
            </Modal>
            <IconButton onClick={()=>modalRef.current?.openModal()}>
                Responder
            </IconButton>
        </>
    )
}

export default ModalReply