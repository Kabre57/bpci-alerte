import React from 'react'
import { BsPerson } from 'react-icons/bs'
import { Switch } from '@headlessui/react'
import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { motion } from "framer-motion"
import Back from '../components/Back'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, child, push, set, update } from "firebase/database";
import { db } from '../plugins/firebase'


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



const CreateService = () => {


    const [enabled, setEnabled] = useState(false)
    let navigate = useNavigate();

    const handlelog = async () => {
        console.log("dddddddddddddddddddddddd")
        let name = document.getElementById('name').value
        //let role = document.getElementById('Option').value
        if (name.length != 0)
        {
            const newPlainteKey = push(child(ref(db), 'services')).key;
            set(ref(db, 'services/' + newPlainteKey), {'nom': name});
            navigate('/services');

        }

        
        
        
    
        
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
                <div className="mt-[2rem]">
                    <div className="w-full">
                        <label htmlFor="name">Intitulé du service </label>
                        <input id="name" name="name" type="name"
                            className="border border-bpcidark"
                            style={{ borderWidth: "1px", borderColor: "#CED4DA" }}
                        />
                    </div>
                </div>

                {/* <div className="w-full m-2">
                    <label htmlFor="select">Département chargé</label>

                    <select name="Option" id="Option">
                        <option value="Option 01">Nettoyage</option>
                        <option value="Option 02">Comptabilité</option>
                        <option value="Option 02">DSI</option>
                    </select>
                </div> */}

                <div className="mt-[1.1rem] text-right">
                    <button
                        onClick={handlelog}
                        // onClick={handleLog}
                        className="bg-[var(--color-bpciblue)]
                    transition-all active:scale-[.95] 
                        text-sm
                        focus:ring-violet-300
                            py-2 text-white px-5
                            rounded-md">
                        Créer le service
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default CreateService