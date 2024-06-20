import styles from './InputSeach.module.css'
import Search from '../Icons/Search'

const InputSearch = () => {
  return (
    <form className={styles.input__container} action='/'>
        <div className={styles.inputContent}>
            <Search />
            <input className={styles.inpSearch} type="text" placeholder='Digite o que vocè procura' name='q'/>
        </div>
        <button className={styles.btn__Search}>Buscar</button>
    </form>
  )
}

export default InputSearch