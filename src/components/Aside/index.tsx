import Image from 'next/image'
import React from 'react'
import logo from './logo.svg'
import styles from './aside.module.css'
import Link from 'next/link'
import Feed from '../Icons/Feed'
import Perfil from '../Icons/Perfil'
import Info from '../Icons/Info'
import Logout from '../Icons/Logout'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { Login } from '../Icons/Login'
import { ISession } from '@/interfaces/ISession'

const Aside = async () => {
    const session : ISession | null= await getServerSession(options)
    return (
        <aside className={styles.aside__container}>
            <Link href={'/'} className={styles.off}>
                <Image
                    src={logo}
                    alt='logo'
                    width={127}
                    height={40}
                    priority
                />
            </Link>
            <div className={styles.links__container}>
                <Link href={'/publicar'} className={`${styles.ancorAside} ${styles.off}`}>
                    <span className={styles.btnCreate}>Publicar</span>
                </Link>
                <Link href={'/'} className={styles.ancorAside}>
                    <Feed/>
                    <span className={styles.ancorText}>Feed</span>
                </Link>
                {session && 
                    <Link href={'/profile'} className={styles.ancorAside}>
                        <Perfil/>
                        <span className={styles.ancorText}>Perfil</span>
                    </Link>
                }
                <Link href={'#'} className={styles.ancorAside}>
                    <Info/>
                    <span className={styles.ancorText}>Sobre nós</span>
                </Link>
                {!session && <Link href={"/api/auth/signin"} className={styles.ancorAside}>
                    <Login/>
                        <span className={styles.ancorText}>Login</span>
                    </Link>
                }
                {session && <Link href={'/api/auth/signout'} className={styles.ancorAside}>
                        <Logout/>
                        <span className={styles.ancorText}>Sair</span>
                    </Link>
                }
            </div>
        </aside>
    )
}

export default Aside