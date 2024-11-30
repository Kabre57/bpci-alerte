import React from 'react'

import NOT_FOUND from "../images/no_Message.png"
const BoxChatter = () => {
    return (
        <div className="flex items-center flex-col justify-center mx-auto mt-[1.5rem]">
            <div className="max-w-[200px]">
                <img
                    src={NOT_FOUND}
                    alt="logo"
                />
            </div>
            <p className='text-center'>Le chatter est vide pour l'instant. </p>
            <p className='text-center'>Veuillez bien envoyer un message pour le voir dans cette section.</p>
        </div>
    )
}

export default BoxChatter