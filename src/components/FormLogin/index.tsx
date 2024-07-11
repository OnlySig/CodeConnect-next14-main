'use client'

import { signIn } from 'next-auth/react'
import ArrowFoward from '../Icons/ArrowFoward'
import InputAuth from '../InputAuth'
import styles from './FormLogin.module.css'
import Link from 'next/link'
import { useState } from 'react'
const FormLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const loginAttempt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn('credentials', {
            callbackUrl: '/',
            email,
            password
        })
    }
    return (
        <form className={styles.formAuth__loginContainer} onSubmit={loginAttempt}>
            <InputAuth
                onChange={e=>setEmail(e.target.value)}
                value={email}
                name='user'
                required 
                isLabel 
                label='Email ou usuário'
                id='user'
                placeholder='email / usuario'
                type='text'
            />
            <InputAuth
                onChange={e=>setPassword(e.target.value)}
                value={password}
                name='password'
                required
                isLabel
                label='Senha'
                placeholder='digite a sua senha'
                type='password'
                id='senha'
            />
            <div className={styles.radioForget__container}>
                <div className={styles.radio__content}>
                    <input type="radio" name="" id="" />
                    <span>
                        Lembrar-me
                    </span>
                </div>
                <Link href={'/'}>Esqueci a senha</Link>
            </div>
            <div className={styles.btnLogin__container}>
                <button className={styles.btnLogin}>
                    <span>
                        Login
                        <ArrowFoward/>
                    </span>
                </button>
            </div>
        </form>
    )
}
export default FormLogin