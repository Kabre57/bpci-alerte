import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { motion } from "framer-motion"
import Back from '../components/Back'
import { auth } from "../plugins/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify'
//import admin from "firebase-admin";

const containerVariants = {



    hidden: {
        opacity: 0,
        x: "2.5vh",
    },
    visible: {
        opacity: 1,
        x: "0",
        // transition: { duration: .5 }
    },
    exit: {
        x: "-2.5vh",
        opacity: 0,
        transition: { ease: 'easeInOut' },
    }
};



const InviteUser = () => {

    // admin.initializeApp({
    //     credential: admin.credential.applicationDefault(),
    //     databaseURL: "https://bpci-alerte-default-rtdb.europe-west1.firebasedatabase.app",
    //   });

    const handlelog = async () => {
        console.log("dddddddddddddddddddddddd")


        let email = document.getElementById('mail').value
        //let password = document.getElementById('password').value
        let name = document.getElementById('nameprenom').value
        //let role = document.getElementById('Option').value


        const db = getFirestore();

        // Créer un utilisateur avec une adresse e-mail et un mot de passe
        createUserWithEmailAndPassword(auth, email, "123456")
            .then((userCredential) => {
                const user = userCredential.user;
                const { uid } = user;

                // Envoyer un e-mail de bienvenue à l'utilisateur
                sendPasswordResetEmail(auth, email, {
                    url: "https://bpci-alerte.web.app/",
                    handleCodeInApp: true,
                    // Personnalisez le message ci-dessous avec le nom de votre application et toute autre information pertinente
                    message: `Bienvenue sur Alerte, ${name}! Cliquez sur ce lien pour réinitialiser votre mot de passe `,
                })
                    .then(() => {
                        toast.success(`Action réussie. Un email a été envoyé à l'utilisateur ${email}`, { draggable: true })
                        document.getElementById('mail').value = ""
                        document.getElementById('nameprenom').value = ""
                    })
                    .catch((error) => {
                        toast.error("Erreur lors de l'envoi de l'e-mail", { draggable: true })
                        document.getElementById('mail').value = ""
                        document.getElementById('nameprenom').value = ""
                    });

                // Enregistrer le rôle de l'utilisateur dans la base de données
                //   const userDocRef = doc(db, "users", uid);
                //   setDoc(userDocRef, {displayName: name, role: role })
                //     .then(() => {
                //       console.log("Utilisateur créé et rôle enregistré");

                //       // Définir les rôles d'utilisateur personnalisés
                //     //   const customClaims = { role: role };
                //     //   admin
                //     //     .auth()
                //     //     .setCustomUserClaims(uid, customClaims)
                //     //     .then(() => {
                //     //       console.log("Droits d'accès personnalisés définis pour l'utilisateur");
                //     //     })
                //     //     .catch((error) => {
                //     //       console.error("Erreur lors de la définition des droits d'accès personnalisés :", error);
                //     //     });
                //     })
                // .catch((error) => {
                //   console.error("Erreur lors de l'enregistrement du rôle :", error);
                // });
            })
            .catch((error) => {
                if (error?.message === "Firebase: Error (auth/email-already-in-use).") {
                    toast.error("Une erreur est survenue: Cet email est déja utilisé par un autre utilisateur", { draggable: true })
                    document.getElementById('mail').value = ""
                    document.getElementById('nameprenom').value = ""
                    return
                }

                toast.error("Une erreur est survenue lors de la création de l'utilisateru dans la base.", { draggable: true })
                document.getElementById('mail').value = ""
                document.getElementById('nameprenom').value = ""
            });
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[2rem] mb-[5rem]'>

            <div className="mb-[2rem]">
                <Back />
            </div>
            <div className="max-w-[800px] shadow-lg p-[2rem] rounded-sm">

                <h2 className="text-[var(--color-bpciblue)] 
                    font-PoppinsSemiBold text-[1.2rem]">Ajouter un utilisateur</h2>
                {/* <div className="flex gap-3 items-center">
                    <div className="rounded-full h-[3.5rem] w-[3.5rem]
                bg-gray-500 flex items-center justify-center">
                        <BsPerson color='white' size={25} />
                    </div>
                    <p className='text-[1.3rem]'>George N'CHO</p>
                </div> */}
                <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="nameprenom">Nom et prénoms </label>
                        <input autoComplete='off' id="nameprenom" name="nameprenom"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div>

                {/* <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="firstName">Prénom </label>
                        <input id="firstName" name="firstName" type="firstName"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div> */}

                <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="mail">Mail </label>
                        <input autoComplete='off' id="mail" name="mail" type="mail"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div>

                {/* <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="password">Mot de passe </label>
                        <input id="password" security name="password" type="password"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div> */}

                {/* <div className="flex gap-3 my-[1.5rem] w-fit p-3 px-[1rem] bg-[#F5F7F9]">
                    <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${enabled ? 'bg-[var(--color-bpciblue)]' : 'bg-gray-300'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                    <p>Imposer le changement de mot de passe</p>
                </div> */}

                {/* <div className="w-full m-2">
                    <label htmlFor="select">Rôle utilisateur</label>

                    <select name="Option" id="Option">
                        <option value="client">Client</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </div> */}

                <div className="mt-[1.1rem] text-right">
                    <button

                        onClick={handlelog}
                        className="bg-[var(--color-bpciblue)]
                    transition-all active:scale-[.95] 
                        text-sm
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                        Inviter l'utilisateur
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default InviteUser