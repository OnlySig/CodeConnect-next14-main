'use client' // Error components must be Client Components
 
import ArrowBack from '@/components/Icons/ArrowBack'
import Link from 'next/link'
import { useEffect } from 'react'
import styles from './error.module.css'
import Image from 'next/image'
import Banner from '../assets/errorImage.png'

export default function Error({
  error
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <section className={styles.errorContainer}>
      <Image alt='imagem de erro na página' src={Banner} width={656} height={367}/>
      <h2 className={styles.subTitle}>Opa! Um erro ocorreu.</h2>
      <span className={styles.spanContent} >Não conseguimos carregar a página, volte para seguir navegando</span>
      <Link href='/' className={styles.linkContent}>
        Voltar ao feed <ArrowBack />
      </Link>
    </section>
  )
}