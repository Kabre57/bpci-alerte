import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { motion } from "framer-motion"
import Back from '../components/Back'
import { auth } from "../plugins/firebase";
import { updateEmail, updatePassword} from "firebase/auth";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootUserContext } from '../contexts'
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



const ResetCredentials = () => {

    const userContext = React.useContext(RootUserContext)

    const [enabled, setEnabled] = useState(false)
    const handlelog = async () => {
    console.log("dddddddddddddddddddddddd")
    
    const user = auth.currentUser;
    let email = document.getElementById('mail').value
    let password = document.getElementById('password').value
    
    //let role = document.getElementById('Option').value

  // Update email
  updateEmail(user, email)
    .then(() => {
      toast.success(`User email updated successfully!`, { draggable: true })

      // Update password
      if (password.length !=0)
      {

        updatePassword(user, password)
        .then(() => {
          toast.success(`User password updated successfully!`, { draggable: true })
        })
        .catch((error) => {
        //   console.error("Error updating user password:", error);
          toast.error(`Error updating user password:`, { draggable: true })
        });

      }
      
    })
    .catch((error) => {
    //   console.error("Error updating user email:", error);
      toast.error(`Error updating user email:`, { draggable: true })
    });
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit" className='px-[2rem] mb-[5rem]'>

            <div className="w-full shadow-lg p-[2rem] rounded-sm">
                <h2 className="text-[var(--color-bpciblue)] 
                    font-PoppinsSemiBold text-[1.2rem]">Modifiez vos informations</h2>
                <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="mail">Mail </label>
                        <input
                            value={userContext.user?.email}
                            autoComplete='off' id="mail" name="mail" type="mail"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div>

                <div className="flex gap-3 my-[1.5rem] w-fit p-3 px-[1rem] bg-[#F5F7F9]">
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
                    <p>Modifier le mot de passe</p>
                </div>

                {
                    enabled && <>
                        <div className="mt-[2rem]">
                            <div className="w-full">
                                <label htmlFor="oldpassword">Mot de passe actuel</label>
                                <input autoComplete='off' id="oldpassword" security name="oldpassword" type="password"
                                    className="border border-bpcidark"
                                    style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                                />
                            </div>
                        </div>

                        <div className="mt-[2rem]">
                            <div className="w-full">
                                <label htmlFor="password">Nouveau mot de passe</label>
                                <input autoComplete='off' id="password" security name="password" type="password"
                                    className="border border-bpcidark"
                                    style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                                />
                            </div>
                        </div>
                    </>
                }

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
                        Valider les modifications
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default ResetCredentials