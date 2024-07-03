import React from 'react'
import styles from '../layout.module.css'
import Image from 'next/image'
import BannerImage from './cadastroBanner.png'
import Providers from '@/components/Providers'
import FormCadastro from '@/components/FormCadastro'
import { Login } from '@/components/Icons/Login'
import Link from 'next/link'

const Signon = async () => {
    return (
        <div className={styles.auth__container}>
            <Image src={BannerImage} alt='login banner' width={407} height={628} priority/>
            <div className={styles.form__login}>
                <h1 className={styles.title__login}>Cadastro</h1>
                <span className={styles.subTitle__login}>Ola! Preencha seus dados.</span>
                <FormCadastro/>
                <Providers/>
                <footer className={styles.footer__content}>
                    <span className={styles.count}>Ja tem conta?</span>
                    <Link href={'/signin'} className={styles.cadastro}>
                        <h3>Faça seu login!</h3>
                        <Login color='#81FE88'/>
                    </Link>
                </footer>
            </div>
        </div>
    )
}

export default Signon