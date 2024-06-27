'use client'
import React, { useRef, useState } from 'react'
import Modal from '../Modal'
import IconButton from '../IconButton'
import { Chat } from '../Icons/Chat'
import styles from './ModalComponent.module.css'
import SubmitButton from '../SubmitButton'

const ModalComment = ({ action } : { action : (formData: FormData) => Promise<void>}) => {
    const [textArea, setTextArea] = useState('')
    const modalRef = useRef<{openModal:()=>void, closeModal: ()=>void}>(null)
    const handleSubmit = () => {
        modalRef.current?.closeModal()
        setTextArea('')
    }
    return (
        <>
            <Modal ref={modalRef}>
                <form action={action} className={styles.modalForm__container} onSubmit={handleSubmit}>
                    <h1 className={styles.modalTitle}>Deixe seu comentário sobre o post:</h1>
                    <textarea required name="text" value={textArea} onChange={e=>setTextArea(e.target.value)} className={styles.textArea__content} placeholder='Digite seu comentário' ></textarea>
                    <div className={styles.btnContainer}>
                        <SubmitButton>
                            Comentar
                        </SubmitButton>
                    </div>
                </form>
            </Modal>
            <IconButton onClick={()=>modalRef.current?.openModal()}>
                <Chat />
            </IconButton>
        </>
    )
}

export default ModalComment