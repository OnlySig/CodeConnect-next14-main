'use client'

import React from 'react'
import styles from './providers.module.css'
import GitHubIcon from '../Icons/Github'
import GmailIcon from '../Icons/Gmail'
import { signIn } from 'next-auth/react'

const Providers = () => {
    const loginAttempt = () => {
        signIn('github', {
            callbackUrl: '/'
        })
    }

    return (
        <div className={styles.providers__container}>
            <div className={styles.rows}>
                <span className={styles.row}></span>
                    <p>ou entre com outras contas</p>
                <span className={styles.row}></span>
            </div>
            <ul className={styles.providers__content}>
                <li className={styles.provider__item}>
                    <button onClick={loginAttempt}>
                        <GitHubIcon/>
                        <span>Github</span>
                    </button>
                </li>
                <li className={styles.provider__item}>
                    <button>
                        <GmailIcon/>
                        <span>Gmail</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Providers