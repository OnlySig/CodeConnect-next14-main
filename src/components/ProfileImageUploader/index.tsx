'use client'

import { IUser } from "@/interfaces/IUser"
import Image from "next/image"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import avatarDefault from "./empty-avatar.png"
import styles from './Profiler.module.css'
import Loader from "../Loader"
import InputAuth from "../InputAuth"
import { revalidatePath } from "next/cache"

const ProfileImageUploader = ({ user } : { user: IUser }) => {
    const [pedding, setPedding] = useState(true)
    const [imgSrc, setImgSrc] = useState<any>(user.image ?? user.avatar ?? avatarDefault)
    const [username, setUsername] = useState(user.username)
    const [newAvatar, setNewAvatar] = useState<any>()
    const [toggleEdit, setToggleEdit] = useState(false)
    const [bio, setBio] = useState(user.bio??'')
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if(file) {
            setNewAvatar(file)
            const reader = new FileReader()
            reader.onloadend = ()=>{
                setImgSrc(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const uploadAvatar = (e: FormEvent<HTMLFormElement>) => {
        if(newAvatar) {
            e.preventDefault()
            fetch('/api/profile', {
                method: 'POST',
                body: newAvatar
            })
        }
    }
    const editarUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(username) {
            try {
                const resp = await fetch('/api/profileUsername', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username })
                })
                const data = await resp.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const updateBio = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(bio) {
            try {
                const resp = await fetch('/api/profileBio', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bio })
                })
                const data = await resp.json()
                console.log(data)
            } catch (error) {
                console.log(error)
            }      
        }
    }
    useEffect(()=>{
        if(user) setPedding(false)
    },[user])
    if(!user) return null
    return (<>
        <ul className={styles.profile__container}>
            <ul className={styles.profile__content}>
                <ul className={styles.top__profile}>
                    <li>
                        <h3 className={styles.nickname__profile}>@{user.username ?? <span>Clique em editar para criar um username</span>}</h3>
                        <form onSubmit={editarUser} className={toggleEdit ? styles.form__username : styles.off}>
                            <InputAuth name="user-name" value={username} onChange={e=>setUsername(e.target.value)}/>
                        </form>
                    </li>
                    <li>
                        <button className={styles.btnEditar__profile} onClick={()=>setToggleEdit(!toggleEdit)}>Editar</button>
                    </li>
                </ul>
                <li>
                    <h1 className={styles.username__profile}>{user.name}</h1>
                </li>
                <li className={toggleEdit ? styles.form__bioContainer : styles.off}>
                    <form onSubmit={updateBio}>
                        <h2>Editar sua bio</h2>
                        <textarea required name="user-bio" value={bio} onChange={e=>setBio(e.target.value)}></textarea>
                        <button type="submit">editar bio</button>
                    </form>
                </li>
                {!toggleEdit && <li className={styles.bio__profile}>{user?.bio??'Clique em editar para criar a sua bio!'}</li>}
            </ul>
            <li>
                {pedding 
                    ? <Loader/> 
                    : <Image 
                        priority
                        className={styles.profile__image}
                        src={imgSrc}
                        alt={user.name??''}
                        width={254}
                        height={254}
                    />
                }
            </li>
        </ul>
        <form onSubmit={uploadAvatar} className={toggleEdit ? styles.formImage : styles.off}>
            <input 
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
            />
            <button type="submit">
                Upload foto
            </button>
        </form>
    </>)
}

export default ProfileImageUploader