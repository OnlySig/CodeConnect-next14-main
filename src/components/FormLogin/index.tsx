import ArrowFoward from '../Icons/ArrowFoward'
import InputAuth from '../InputAuth'
import styles from './FormLogin.module.css'
import Link from 'next/link'
const FormLogin = () => {
    return (
        <form className={styles.formAuth__loginContainer} >
            <InputAuth 
                name='user'
                required 
                isLabel 
                label='Email ou usuário'
                id='user'
                placeholder='email / usuario'
                type='text'
            />
            <InputAuth
                name='password'
                required
                isLabel
                label='Senha'
                placeholder='*****'
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