import React from 'react'
import styles from './providers.module.css'
import GitHubIcon from '../Icons/Github'
import GmailIcon from '../Icons/Gmail'

const Providers = () => {
    return (
        <div className={styles.providers__container}>
            <div className={styles.rows}>
                <span className={styles.row}></span>
                    <p>ou entre com outras contas</p>
                <span className={styles.row}></span>
            </div>
            <ul className={styles.providers__content}>
                <li className={styles.provider__item}>
                    <GitHubIcon/>
                    <span>GitHub</span>
                </li>
                <li className={styles.provider__item}>
                    <GmailIcon/>
                    <span>Gmail</span>
                </li>
            </ul>
        </div>
    )
}

export default Providers