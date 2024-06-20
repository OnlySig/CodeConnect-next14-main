import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './NotFound.module.css'
import ArrowBack from '@/components/Icons/ArrowBack'
import Banner from '../assets/notFound.png'

const NotFound = () => {
    return (
        <section className={styles.errorContainer}>
            <Image alt='imagem de erro na página' src={Banner} width={656} height={367}/>
            <h2 className={styles.subTitle}>OPS! Página não encontrada.</h2>
            <span className={styles.spanContent}>Você pode voltar ao feed e continuar buscando projetos incríveis!</span>
            <Link href='/' className={styles.linkContent}>
              Voltar ao feed <ArrowBack />
            </Link>
        </section>
    )
}

export default NotFound