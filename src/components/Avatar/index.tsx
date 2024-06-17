import Image from "next/image"
import styles from "./Avatar.module.css"

const Avatar = ({ image, name } : { image: string, name: string }) => {
    return (
        <ul className={styles.ul__container}>
            <li><Image src={image} alt={`avatar do(a) ${name}`} width={32} height={32}/></li>
            <li className={styles.li__item}>@{name}</li>
        </ul>
    )
}

export default Avatar