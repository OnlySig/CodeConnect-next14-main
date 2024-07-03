import { ReactElement } from "react";
import styles from './layout.module.css'

export default function AuthLayout({ children } : { children: ReactElement }) {
    return (
        <section className={styles.container}>
            <div className={styles.container__authLayout}>
                { children }
            </div>
        </section>
    )
}