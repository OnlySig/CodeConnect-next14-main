'use client'
import { IComment } from '@/interfaces/IComment'
import React, { useRef } from 'react'
import Modal from '../Modal'
import SubmitButton from '../SubmitButton'
import IconButton from '../IconButton'
import { postReplay } from '@/actions'

const ModalReply = ({ comment } : { comment: IComment }) => {
    const modalRef = useRef<{openModal:()=>void, closeModal: ()=>void}>(null)
    const action = postReplay.bind(null, comment)

    return (
        <>
            <Modal ref={modalRef}>
                <form action={action} onSubmit={()=>modalRef.current?.closeModal()}>
                    <h1>{comment.text}</h1>
                    <textarea required name="text"></textarea>
                    <div>  
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