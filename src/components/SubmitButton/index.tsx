import React, { ReactElement } from 'react'
import { useFormStatus } from 'react-dom'
import Loader from '../Loader'
import ArrowFoward from '../Icons/ArrowFoward'
import styles from './SubmitButton.module.css'

const SubmitButton = ({ children } : { children : string | ReactElement | ReactElement[]}) => {
    const { pending } = useFormStatus() 
    return (
        <button className={styles.btnPost} disabled={pending} type='submit'>
            { pending ? <Loader/> : <>{ children }<ArrowFoward/></>}
        </button>
    )
}

export default SubmitButton