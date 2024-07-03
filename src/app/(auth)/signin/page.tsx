import React from 'react'
import styles from '../layout.module.css'
import Image from 'next/image'
import BannerImage from './loginBanner.png'
import FormLogin from '@/components/FormLogin'
import Providers from '@/components/Providers'
import Task from '@/components/Icons/Task'
import Link from 'next/link'

const Signin = async () => {
    return (
        <div className={styles.auth__container}>
            <Image src={BannerImage} alt='login banner' width={407} height={628} priority/>
            <div className={styles.form__login}>
                <h1 className={styles.title__login}>Login</h1>
                <span className={styles.subTitle__login}>Boas-vindas! Faça seu login.</span>
                <FormLogin/>
                <Providers/>
                <span className={styles.count}>Ainda não tem conta?</span>
                <Link href={'/signon'} className={styles.cadastro}>
                    <h3>Crie seu cadastro!</h3>
                    <Task/>
                </Link>
            </div>
        </div>
    )
}

export default Signin