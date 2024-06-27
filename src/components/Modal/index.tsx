'use client'

import { ReactElement, forwardRef, useImperativeHandle, useRef } from "react"
import styles from './Modal.module.css'

const Modal = forwardRef(({ children } : { children: ReactElement[] | ReactElement }, ref)=>{
    const dialogRef = useRef<HTMLDialogElement | null>(null)
    const closeModal = () => {
        dialogRef.current?.close()
    }
    const openModal = () => {
        dialogRef.current?.showModal()
    }
    useImperativeHandle(ref, ()=>{
        return {
            openModal,
            closeModal
        }
    })
    return(
        <dialog ref={dialogRef} className={styles.dialog__container}>
            <header className={styles.dialog__header}>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <button className={styles.dialog__btnExit} onClick={closeModal}>X</button>
                </div>
                <div className={styles.dialog__content}>
                    { children }
                </div>
            </header>
        </dialog>
    )
})
Modal.displayName = "modal"

export default Modal