'use client'
import React from 'react'
import IconButton from '../IconButton'
import { ThumbsUp } from '../Icons/ThumbsUp'
import Loader from '../Loader'
import { useFormStatus } from 'react-dom'

const ThumbsUpButton = () => {
    const { pending } = useFormStatus() //esse hook gerancia o estado de um FORMULÁRIO, sim, tem q estar dentro de um formulário, aqui está sendo usado para mostrar um loading quando vc clicar em like.
    return (
        <IconButton disabled={pending}>
            {pending ? <Loader/> : <ThumbsUp/>}
        </IconButton>
    )
}

export default ThumbsUpButton