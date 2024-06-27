import React, { ReactElement } from 'react'
import styles from './IconButton.module.css'

const IconButton = ({ children, disabled, onClick, ...rest } : { children: ReactElement[] | ReactElement | string, disabled?: boolean, onClick?: ()=>void }) => {
  return (
    <button className={styles.btn} {...rest} disabled={disabled} onClick={onClick}>{children}</button>
  )
}

export default IconButton