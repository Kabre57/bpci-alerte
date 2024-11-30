import React from 'react'
import { useLocation } from 'react-router'

const TopNavigationInfo = () => {

    let location = useLocation()?.pathname

    return (
        <div className="bg-[#08620f] py-8">
            <div className="fixed-w px-10 flex items-center gap-2">
                <span style={{ color: '#ffffff' }} >Acceuil</span> / <span className='text-[var(--color-bpciwhite)] font-PoppinsSemiBold underline'>{location === "/apropos" ? "A propos" :
                    ((location === "/depotplainte") || (location === "/depotplainteStep2")) ? "Formulaire de dépôt":
                    (location === "/resumeform") ? "Résumé formulaire de dépôt":
                    (location === "/recapPDF") ? "Vue PDF Récapitulatif plainte":
                    (location === "/recapitilatif") ? "Récapitulat formulaire de dépôt"
                        : "Suivi de plainte"}</span>
            </div>
        </div>
    )
}

export default TopNavigationInfo