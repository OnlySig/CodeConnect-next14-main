import InputAuth from '../InputAuth'
import styles from './FormLogin.module.css'
import { createUser } from '@/actions'
import ArrowFoward from '../Icons/ArrowFoward'

const FormCadastro = async () => {
    return (
        <form className={styles.formAuth__loginContainer} action={createUser}>
            <InputAuth
                name='name'
                required 
                isLabel 
                label='Nome'
                id='nome'
                placeholder='Nome completo'
                type='text'

            />
            <InputAuth
                name='email'
                required
                isLabel
                label='Email'
                placeholder='Digite seu email'
                type='email'
                id='email'
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
                    <span>Lembrar-me</span>
                </div>
            </div>
            <div className={styles.btnLogin__container}>
                <button className={styles.btnLogin}>
                    <span>
                        Cadastrar
                        <ArrowFoward/>
                    </span>
                </button>
            </div>
        </form>
    )
}

export default FormCadastro