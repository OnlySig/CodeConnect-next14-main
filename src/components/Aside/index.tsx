import Image from 'next/image'
import React from 'react'
import logo from './logo.svg'
import styles from './aside.module.css'

const Aside = () => {
    return (
        <aside className={styles.aside__container}>
            <Image
                src={logo}
                alt='logo dahora doido'
                width={127}
                height={40}
                priority
            />
        </aside>
    )
}

export default Aside