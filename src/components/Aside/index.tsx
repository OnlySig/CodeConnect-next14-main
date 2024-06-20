import Image from 'next/image'
import React from 'react'
import logo from './logo.svg'
import styles from './aside.module.css'
import Link from 'next/link'

const Aside = () => {
    return (
        <aside className={styles.aside__container}>
            <Link href={'/'}>
                <Image
                    src={logo}
                    alt='logo dahora doido'
                    width={127}
                    height={40}
                    priority
                />
            </Link>
        </aside>
    )
}

export default Aside