import styles from './InputSeach.module.css'
import Search from '../Icons/Search'

const InputSearch = () => {
  return (
    <div className={styles.input__container}>
        <div className={styles.inputContent}>
            <Search />
            <input className={styles.inpSearch} type="text" placeholder='Digite o que vocè procura'/>
        </div>
        <button className={styles.btn__Search}>Buscar</button>
    </div>
  )
}

export default InputSearch