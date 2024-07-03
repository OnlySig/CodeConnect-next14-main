'use client'

import { IUser } from "@/interfaces/IUser"
import Image, { StaticImageData } from "next/image"
import { ChangeEvent, FormEvent, useState } from "react"
import avatarDefault from "./empty-avatar.png"

const ProfileImageUploader = ({ user } : { user: IUser }) => {
    const [imgSrc, setImgSrc] = useState<any>(user.image ?? user.avatar ?? avatarDefault)
    const [newAvatar, setNewAvatar] = useState<any>()
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if(file) {
            const reader = new FileReader()
            reader.onloadend = ()=>{
                setImgSrc(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const uploadAvatar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setNewAvatar(imgSrc)
        fetch('/api/profile', {
            method: 'POST',
            body: newAvatar
        })
    }
    console.log(imgSrc)
    if(!user) return null
    return (<>
        <ul>
            <li>{user.name}</li>
            <li>
                <Image 
                    priority
                    src={imgSrc}
                    alt={user.name??''}
                    width={254}
                    height={254}
                />
            </li>
        </ul>
        <form onSubmit={uploadAvatar}>
            <input 
                type="file"
                onChange={handleFileChange}
                required
            />
            <button type="submit">
                Upload
            </button>
        </form>
    </>)
}

export default ProfileImageUploader