import React from 'react'
import styles from './InputAuth.module.css'

interface InputProps {
    isLabel?: boolean
    label?: string
    type?: string
    name: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
    id?: string
    required?: boolean
    placeholder?: string
}

const InputAuth = ({ isLabel = false, type = 'text', value, onChange, id, required, label, placeholder, name } : InputProps) => {
  return (
    <div className={styles.input__container}>
        {isLabel && <label>{label}</label>}
        <input id={id} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}/>
    </div>
  )
}

export default InputAuth